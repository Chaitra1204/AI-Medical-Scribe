## Project Overview

**Aushadh** is an AI-powered medical scribe designed to assist doctors during patient consultations by automating clinical documentation and safety checks.

The system listens to the doctor–patient conversation, converts the speech into text using AI transcription, and generates structured **SOAP clinical notes**. It also analyzes prescribed medications to detect potential **drug interactions**, suggests relevant **ICD-10 billing codes**, and generates a **print-ready prescription PDF**.

In addition, Aushadh can export consultation records as **FHIR-compliant reports**, enabling interoperability with modern healthcare systems and electronic health records.

By reducing manual documentation, Aushadh helps doctors save time, minimize prescription errors, and focus more on patient care.

---

## Key Features

- **AI Medical Scribe** – Converts doctor–patient conversations into structured **SOAP clinical notes** automatically.

- **Drug Interaction Detection** – Checks prescribed medications using the **OpenFDA database** to identify potential harmful drug combinations.

- **ICD-10 Code Suggestions** – Automatically recommends relevant **medical billing codes** to support accurate clinical documentation.

- **Prescription PDF Generation** – Generates a **print-ready prescription** after the consultation.

- **FHIR Report Export** – Converts consultation data into **FHIR-compliant healthcare reports** for interoperability with hospital EHR systems.

- **Fast Clinical Workflow** – Completes transcription, analysis, and documentation in **under 90 seconds**.
# Tech Stack

| Layer | Technology |

| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | FastAPI (Python) |
| Transcription | Groq Whisper API |
| SOAP Generation | Groq + LLaMA 3.3 70B |
| Drug Safety | OpenFDA API |
| PDF Export | ReportLab |
| Storage | Local Storage (Prototype) |

Total infrastructure cost to run this prototype: **₹0**

---

# Running the Project Locally

You need:

- Node.js
- Python
- A free **Groq API key**

Get a key from:

https://console.groq.com

---

## Step 1 — Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/aushadh.git
cd aushadh
```

## Step 2 — Start Backend

```bash
cd backend
python -m venv venv
```

Activate virtual environment:

**Windows**

```bash
venv\Scripts\activate
```

**Mac / Linux**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Step 3 — Add Groq API Key

Create a `.env` file inside the **backend** folder and add:

```
GROQ_API_KEY=your_api_key_here
```

---

## Step 4 — Run Backend

```bash
uvicorn main:app --reload --port 8000
```

Backend will run at:

```
http://localhost:8000
```

---

## Step 5 — Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open in browser:

```
http://localhost:3000
```
## Future Enhancements

- **ABHA Integration** – Connect with India's Digital Health ID system to access and update patient records across hospitals.

- **Multilingual Support** – Enable consultations and transcription in multiple Indian languages.

- **Cloud-Based EHR Sync** – Securely store and sync patient records across devices and hospital branches.

- **Mobile Application** – Allow doctors to use Aushadh directly from a smartphone during consultations.

- **AI Health Insights** – Use aggregated data to provide predictive insights and clinical decision support.

- **Hospital & Insurance Integration** – Automate billing workflows and streamline insurance claim processing.
