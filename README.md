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

git clone https://github.com/YOUR_USERNAME/aushadh.git
cd aushadh

```bash
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
