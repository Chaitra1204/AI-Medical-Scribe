import os
import tempfile
from datetime import datetime
from contextlib import asynccontextmanager

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel

from soap_prompt import generate_soap_note
from pdf_generator import generate_pdf
from fhir_template import build_fhir_composition

load_dotenv()

# ── Globals ──
whisper_model = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load the Whisper model once at startup."""
    global whisper_model
    from faster_whisper import WhisperModel

    print("Loading Whisper model... please wait")
    whisper_model = WhisperModel("base", device="cpu", compute_type="int8")
    print("Whisper ready ✓")
    yield


app = FastAPI(
    title="Aushadh API",
    description="AI-powered medical scribe backend for Indian doctors",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow the Next.js frontend to communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Pydantic models ──

class GenerateNoteRequest(BaseModel):
    transcript: str
    patient_history: str | None = None


class CheckInteractionsRequest(BaseModel):
    medications: list[str]


class PatientInfo(BaseModel):
    patient_name: str
    age: str
    gender: str
    doctor_name: str


class ExportPDFRequest(BaseModel):
    soap_note: dict
    patient_info: PatientInfo


class ExportFHIRRequest(BaseModel):
    soap_note: dict
    patient_info: PatientInfo


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Health Check
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


@app.get("/health")
async def health_check():
    """Health check endpoint to verify the API is running."""
    return {"status": "ok"}


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Audio Transcription
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    """Accept an audio file and return a Whisper transcription."""

    if whisper_model is None:
        raise HTTPException(status_code=503, detail="Whisper model not loaded yet")

    # Save uploaded file to a temp location
    suffix = os.path.splitext(file.filename or "audio.webm")[1]
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    try:
        contents = await file.read()
        tmp.write(contents)
        tmp.close()

        # Run transcription with VAD filter to skip silence
        segments, info = whisper_model.transcribe(
            tmp.name,
            vad_filter=True,
        )

        # Collect all segment texts
        transcript_parts = []
        for segment in segments:
            transcript_parts.append(segment.text.strip())

        transcript = " ".join(transcript_parts)

        return {
            "transcript": transcript,
            "language": info.language,
            "duration": round(info.duration, 2),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")

    finally:
        # Always clean up the temp file
        if os.path.exists(tmp.name):
            os.unlink(tmp.name)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SOAP Note Generation (Claude AI)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


@app.post("/generate-note")
async def generate_note(request: GenerateNoteRequest):
    """Send transcript to Claude and return a structured SOAP note."""

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not configured")

    try:
        soap_note = await generate_soap_note(
            transcript=request.transcript,
            patient_history=request.patient_history,
            api_key=api_key,
        )
        return soap_note

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Note generation failed: {str(e)}")


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Drug Interaction Check (OpenFDA)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


@app.post("/check-interactions")
async def check_interactions(request: CheckInteractionsRequest):
    """Check drug interactions using OpenFDA + known interaction database."""

    medications = request.medications
    interactions: list[dict] = []

    if len(medications) < 2:
        return {"interactions": [], "checked": True}

    # ── Known critical interactions (hardcoded for reliability) ──
    KNOWN_INTERACTIONS = [
        {
            "drugs": ["aspirin", "ibuprofen"],
            "severity": "HIGH",
            "description": "Increased risk of bleeding and reduced cardioprotective effect of aspirin. NSAIDs may antagonize antiplatelet activity.",
        },
        {
            "drugs": ["aspirin", "warfarin"],
            "severity": "HIGH",
            "description": "Significantly increased bleeding risk. Combined anticoagulant and antiplatelet effect.",
        },
        {
            "drugs": ["metformin", "alcohol"],
            "severity": "HIGH",
            "description": "Increased risk of lactic acidosis.",
        },
        {
            "drugs": ["amlodipine", "simvastatin"],
            "severity": "MODERATE",
            "description": "Amlodipine may increase simvastatin levels, raising risk of myopathy.",
        },
        {
            "drugs": ["warfarin", "paracetamol"],
            "severity": "MODERATE",
            "description": "Regular paracetamol use may enhance anticoagulant effect of warfarin.",
        },
        {
            "drugs": ["aspirin", "naproxen"],
            "severity": "HIGH",
            "description": "NSAIDs may reduce cardioprotective effects of aspirin and increase GI bleeding risk.",
        },
        {
            "drugs": ["ibuprofen", "warfarin"],
            "severity": "HIGH",
            "description": "Increased bleeding risk. NSAIDs inhibit platelet function and may displace warfarin.",
        },
        {
            "drugs": ["metformin", "iodine"],
            "severity": "MODERATE",
            "description": "Risk of acute kidney injury and lactic acidosis with iodinated contrast media.",
        },
        {
            "drugs": ["atorvastatin", "clarithromycin"],
            "severity": "HIGH",
            "description": "Clarithromycin inhibits statin metabolism, increasing risk of myopathy.",
        },
        {
            "drugs": ["amlodipine", "clarithromycin"],
            "severity": "MODERATE",
            "description": "Clarithromycin may increase amlodipine levels causing hypotension.",
        },
    ]

    # Check every unique pair
    med_lower = [m.lower().strip() for m in medications]

    for i in range(len(med_lower)):
        for j in range(i + 1, len(med_lower)):
            drug1 = med_lower[i]
            drug2 = med_lower[j]

            # Check against known interactions
            for known in KNOWN_INTERACTIONS:
                k_drugs = known["drugs"]
                if (drug1 in k_drugs[0] or k_drugs[0] in drug1) and \
                   (drug2 in k_drugs[1] or k_drugs[1] in drug2):
                    interactions.append({
                        "drug1": medications[i],
                        "drug2": medications[j],
                        "severity": known["severity"],
                        "description": known["description"],
                    })
                    break
                elif (drug2 in k_drugs[0] or k_drugs[0] in drug2) and \
                     (drug1 in k_drugs[1] or k_drugs[1] in drug1):
                    interactions.append({
                        "drug1": medications[i],
                        "drug2": medications[j],
                        "severity": known["severity"],
                        "description": known["description"],
                    })
                    break

    # Also try OpenFDA as backup
    if not interactions:
        async with httpx.AsyncClient(timeout=10.0) as client:
            for i in range(len(medications)):
                for j in range(i + 1, len(medications)):
                    drug1 = medications[i]
                    drug2 = medications[j]
                    try:
                        response = await client.get(
                            "https://api.fda.gov/drug/event.json",
                            params={
                                "search": f'patient.drug.medicinalproduct:"{drug1}"+AND+patient.drug.medicinalproduct:"{drug2}"',
                                "limit": 3
                            },
                        )
                        if response.status_code == 200:
                            data = response.json()
                            results = data.get("results", [])
                            if results:
                                reactions = set()
                                for result in results:
                                    for reaction in result.get("patient", {}).get("reaction", []):
                                        term = reaction.get("reactionmeddrapt", "")
                                        if term:
                                            reactions.add(term)
                                if reactions:
                                    interactions.append({
                                        "drug1": drug1,
                                        "drug2": drug2,
                                        "severity": "MODERATE",
                                        "description": f"Reported adverse events: {', '.join(list(reactions)[:5])}",
                                    })
                    except Exception:
                        continue

    return {"interactions": interactions, "checked": True}


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PDF Export
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


@app.post("/export-pdf")
async def export_pdf(request: ExportPDFRequest):
    """Generate a clinical PDF report and return it as a file download."""

    try:
        patient_dict = request.patient_info.model_dump()
        pdf_bytes = generate_pdf(request.soap_note, patient_dict)

        # Build filename: aushadh_{patient_name}_{date}.pdf
        safe_name = request.patient_info.patient_name.replace(" ", "_")
        date_str = datetime.now().strftime("%Y%m%d")
        filename = f"aushadh_{safe_name}_{date_str}.pdf"

        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{filename}"'},
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(e)}")


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# FHIR R4 Export
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


@app.post("/export-fhir")
async def export_fhir(request: ExportFHIRRequest):
    """Generate a FHIR R4 Composition resource from a SOAP note."""

    try:
        patient_dict = request.patient_info.model_dump()
        fhir_resource = build_fhir_composition(request.soap_note, patient_dict)
        return fhir_resource

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FHIR export failed: {str(e)}")
