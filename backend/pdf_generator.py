import io
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
)

# ── Color palette ──
PRIMARY = colors.HexColor("#1a5276")
ACCENT = colors.HexColor("#2ecc71")
WARNING_ORANGE = colors.HexColor("#e67e22")
LIGHT_BG = colors.HexColor("#eaf2f8")
WHITE = colors.white
BLACK = colors.black


def _build_styles() -> dict:
    """Create reusable paragraph styles for the PDF."""
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "title",
            parent=base["Title"],
            fontSize=20,
            textColor=PRIMARY,
            spaceAfter=2 * mm,
        ),
        "subtitle": ParagraphStyle(
            "subtitle",
            parent=base["Normal"],
            fontSize=9,
            textColor=colors.grey,
            spaceAfter=4 * mm,
        ),
        "section_heading": ParagraphStyle(
            "section_heading",
            parent=base["Heading2"],
            fontSize=13,
            textColor=PRIMARY,
            spaceBefore=6 * mm,
            spaceAfter=2 * mm,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontSize=10,
            leading=14,
            spaceAfter=2 * mm,
        ),
        "warning": ParagraphStyle(
            "warning",
            parent=base["Normal"],
            fontSize=9,
            textColor=WARNING_ORANGE,
            spaceAfter=2 * mm,
        ),
        "footer": ParagraphStyle(
            "footer",
            parent=base["Normal"],
            fontSize=8,
            textColor=colors.grey,
            alignment=1,  # center
        ),
        "icd_code": ParagraphStyle(
            "icd_code",
            parent=base["Normal"],
            fontSize=9,
            textColor=PRIMARY,
            leftIndent=10 * mm,
        ),
    }


def _add_header(elements: list, styles: dict) -> None:
    """Add clinic header with title and subtitle."""
    elements.append(Paragraph("Aushadh Medical Centre", styles["title"]))
    elements.append(
        Paragraph(
            "AI-Powered Clinical Documentation | ABDM Compliant",
            styles["subtitle"],
        )
    )
    elements.append(
        HRFlowable(
            width="100%", thickness=1, color=PRIMARY, spaceAfter=4 * mm
        )
    )


def _add_patient_info(
    elements: list, patient_info: dict, styles: dict
) -> None:
    """Add patient and doctor info as a two-column table."""
    now = datetime.now().strftime("%d %b %Y, %I:%M %p")
    age_gender = f"{patient_info.get('age', 'N/A')} / {patient_info.get('gender', 'N/A')}"

    data = [
        [
            Paragraph(f"<b>Patient:</b> {patient_info.get('patient_name', 'N/A')}", styles["body"]),
            Paragraph(f"<b>Doctor:</b> {patient_info.get('doctor_name', 'N/A')}", styles["body"]),
        ],
        [
            Paragraph(f"<b>Age / Gender:</b> {age_gender}", styles["body"]),
            Paragraph(f"<b>Date:</b> {now}", styles["body"]),
        ],
    ]

    table = Table(data, colWidths=["50%", "50%"])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    elements.append(table)
    elements.append(Spacer(1, 4 * mm))


def _add_soap_section(
    elements: list,
    title: str,
    content_lines: list[tuple[str, str]],
    needs_review: bool,
    styles: dict,
) -> None:
    """Add a SOAP section with optional review warning."""
    elements.append(Paragraph(title, styles["section_heading"]))

    if needs_review:
        elements.append(
            Paragraph("⚠ This section needs physician review", styles["warning"])
        )

    for label, value in content_lines:
        if value:
            elements.append(
                Paragraph(f"<b>{label}:</b> {value}", styles["body"])
            )


def _add_icd_codes(elements: list, codes: list[dict], styles: dict) -> None:
    """Add ICD-10 codes under the Assessment section."""
    if not codes:
        return
    elements.append(Paragraph("<b>ICD-10 Codes:</b>", styles["body"]))
    for entry in codes:
        code = entry.get("code", "")
        desc = entry.get("description", "")
        elements.append(
            Paragraph(f"• {code} — {desc}", styles["icd_code"])
        )


def _add_prescription_table(
    elements: list, medications: list[dict], styles: dict
) -> None:
    """Add a styled prescription table."""
    if not medications:
        return

    elements.append(Paragraph("Prescription", styles["section_heading"]))

    header = ["Drug", "Dose", "Route", "Frequency", "Duration"]
    data = [header]
    for med in medications:
        data.append(
            [
                med.get("drug_name", ""),
                med.get("dose", ""),
                med.get("route", ""),
                med.get("frequency", ""),
                med.get("duration", ""),
            ]
        )

    table = Table(data, colWidths=["25%", "18%", "15%", "22%", "20%"])

    # Build style commands
    style_commands = [
        # Header row
        ("BACKGROUND", (0, 0), (-1, 0), PRIMARY),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 10),
        # All cells
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ]

    # Alternating row shading
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_commands.append(
                ("BACKGROUND", (0, i), (-1, i), LIGHT_BG)
            )

    table.setStyle(TableStyle(style_commands))
    elements.append(table)


def _add_footer_and_signature(elements: list, styles: dict, doctor_name: str) -> None:
    """Add footer disclaimer and doctor signature block."""
    elements.append(Spacer(1, 12 * mm))
    elements.append(
        HRFlowable(width="100%", thickness=0.5, color=colors.grey, spaceAfter=3 * mm)
    )

    # Signature block — right aligned
    sig_data = [
        ["", ""],
        ["", f"Dr. {doctor_name}"],
        ["", "Signature: ____________________"],
    ]
    sig_table = Table(sig_data, colWidths=["60%", "40%"])
    sig_table.setStyle(
        TableStyle(
            [
                ("ALIGN", (1, 0), (1, -1), "RIGHT"),
                ("FONTSIZE", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 2),
            ]
        )
    )
    elements.append(sig_table)

    elements.append(Spacer(1, 8 * mm))
    elements.append(
        Paragraph("Generated by Aushadh AI Medical Scribe", styles["footer"])
    )
    elements.append(
        Paragraph(
            "Requires physician verification before clinical use",
            styles["footer"],
        )
    )


def generate_pdf(soap_note: dict, patient_info: dict) -> bytes:
    """Generate a complete medical PDF and return it as bytes."""

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=15 * mm,
        bottomMargin=15 * mm,
    )

    styles = _build_styles()
    elements: list = []

    # ── Header ──
    _add_header(elements, styles)

    # ── Patient Info ──
    _add_patient_info(elements, patient_info, styles)

    # ── Subjective ──
    subj = soap_note.get("subjective", {})
    _add_soap_section(
        elements,
        "Subjective",
        [
            ("Chief Complaint", subj.get("chief_complaint", "")),
            ("History of Present Illness", subj.get("history_of_present_illness", "")),
            ("Review of Systems", subj.get("review_of_systems", "")),
        ],
        subj.get("needs_review", False),
        styles,
    )

    # ── Objective ──
    obj = soap_note.get("objective", {})
    _add_soap_section(
        elements,
        "Objective",
        [
            ("Vitals", obj.get("vitals", "")),
            ("Physical Exam", obj.get("physical_exam", "")),
            ("Observations", obj.get("observations", "")),
        ],
        obj.get("needs_review", False),
        styles,
    )

    # ── Assessment ──
    assess = soap_note.get("assessment", {})
    _add_soap_section(
        elements,
        "Assessment",
        [
            ("Diagnosis", assess.get("diagnosis", "")),
            ("Differential", assess.get("differential", "")),
        ],
        assess.get("needs_review", False),
        styles,
    )
    _add_icd_codes(elements, assess.get("icd10_codes", []), styles)

    # ── Plan ──
    plan = soap_note.get("plan", {})
    _add_soap_section(
        elements,
        "Plan",
        [
            ("Tests Ordered", plan.get("tests_ordered", "")),
            ("Follow Up", plan.get("follow_up", "")),
        ],
        plan.get("needs_review", False),
        styles,
    )

    # ── Prescription Table ──
    _add_prescription_table(elements, plan.get("medications", []), styles)

    # ── Footer & Signature ──
    _add_footer_and_signature(
        elements, styles, patient_info.get("doctor_name", "")
    )

    doc.build(elements)
    buffer.seek(0)
    return buffer.read()
