import json
import os
import re

from groq import AsyncGroq


SYSTEM_PROMPT = """You are a clinical documentation AI assistant designed for Indian doctors.

Your role:
- Analyze transcripts of doctor-patient consultations conducted in Indian clinical settings.
- The transcript contains BOTH the doctor and patient speaking together in a single stream.
- Use medical context clues to determine who said what:
    • Symptoms, complaints, pain descriptions, lifestyle details → Patient
    • Examination findings, diagnoses, prescriptions, advice → Doctor
- If patient_history is provided, use it to generate a smarter assessment:
    • Flag if a new prescription conflicts with an existing medication.
    • Reference previous diagnoses in the current assessment.
    • Note progression or improvement of chronic conditions.
- Generate ICD-10 codes for EVERY diagnosis mentioned or implied.
- NEVER hallucinate medication dosages that are not explicitly mentioned in the transcript.
  If a dosage is unclear, write "dosage not specified" and flag needs_review: true.
- Flag ANY section where the transcript provides insufficient data by setting:
    • needs_review: true
    • confidence: "REVIEW NEEDED"
  Otherwise set confidence: "HIGH".

Output rules:
- Return ONLY valid JSON. No markdown, no code fences, no explanation text.
- Follow the exact JSON structure specified in the user message."""


def _build_user_prompt(transcript: str, patient_history: str | None) -> str:
    """Build the user prompt with transcript and optional history."""

    history_block = ""
    if patient_history:
        history_block = f"""
PATIENT HISTORY CONTEXT:
{patient_history}

Use this history to inform your assessment. Flag conflicts between new prescriptions and existing medications.
"""

    return f"""Analyze the following doctor-patient consultation transcript and generate a structured SOAP note.

TRANSCRIPT:
{transcript}
{history_block}
Return your response as a JSON object with this EXACT structure:
{{
  "subjective": {{
    "chief_complaint": "primary reason for visit",
    "history_of_present_illness": "detailed HPI from transcript",
    "review_of_systems": "any systems reviewed",
    "confidence": "HIGH or REVIEW NEEDED",
    "needs_review": false
  }},
  "objective": {{
    "vitals": "any vitals mentioned",
    "physical_exam": "examination findings mentioned by doctor",
    "observations": "any clinical observations",
    "confidence": "HIGH or REVIEW NEEDED",
    "needs_review": false
  }},
  "assessment": {{
    "diagnosis": "primary diagnosis",
    "differential": "differential diagnoses if any",
    "icd10_codes": [
      {{ "code": "ICD-10 code", "description": "description" }}
    ],
    "confidence": "HIGH or REVIEW NEEDED",
    "needs_review": false
  }},
  "plan": {{
    "medications": [
      {{
        "drug_name": "name",
        "dose": "dose or dosage not specified",
        "route": "oral/IV/topical/etc",
        "frequency": "frequency",
        "duration": "duration or not specified"
      }}
    ],
    "tests_ordered": "any lab tests or imaging ordered",
    "follow_up": "follow-up instructions",
    "confidence": "HIGH or REVIEW NEEDED",
    "needs_review": false
  }}
}}

Return ONLY the JSON object. No markdown formatting, no code blocks, no extra text."""


def _strip_markdown_fences(text: str) -> str:
    """Remove markdown code fences if the model wraps the response in them."""
    text = text.strip()
    text = re.sub(r"^```(?:json)?\s*\n?", "", text)
    text = re.sub(r"\n?```\s*$", "", text)
    return text.strip()


async def generate_soap_note(transcript, patient_history, api_key):
    """Call Groq API to generate a structured SOAP note from a consultation transcript."""

    api_key = os.getenv("GROQ_API_KEY")
    client = AsyncGroq(api_key=api_key)

    message = await client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=4096,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {
                "role": "user",
                "content": _build_user_prompt(transcript, patient_history),
            },
        ],
    )

    raw_text = message.choices[0].message.content or ""
    cleaned = _strip_markdown_fences(raw_text)

    try:
        soap_note = json.loads(cleaned)
    except json.JSONDecodeError:
        soap_note = {
            "subjective": {
                "chief_complaint": "Error parsing AI response",
                "history_of_present_illness": "",
                "review_of_systems": "",
                "confidence": "REVIEW NEEDED",
                "needs_review": True,
            },
            "objective": {
                "vitals": "",
                "physical_exam": "",
                "observations": "AI response could not be parsed as JSON",
                "confidence": "REVIEW NEEDED",
                "needs_review": True,
            },
            "assessment": {
                "diagnosis": "",
                "differential": "",
                "icd10_codes": [],
                "confidence": "REVIEW NEEDED",
                "needs_review": True,
            },
            "plan": {
                "medications": [],
                "tests_ordered": "",
                "follow_up": "",
                "confidence": "REVIEW NEEDED",
                "needs_review": True,
            },
        }

    return soap_note
