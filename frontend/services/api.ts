const API_BASE = "http://localhost:8000";

export async function transcribeAudio(file: Blob): Promise<{
  transcript: string;
  language: string;
  duration: number;
}> {
  const formData = new FormData();
  formData.append("file", file, "recording.webm");

  const res = await fetch(`${API_BASE}/transcribe`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Transcription failed" }));
    throw new Error(err.detail || "Transcription failed");
  }

  return res.json();
}

export async function generateNote(
  transcript: string,
  patientHistory?: string
): Promise<Record<string, unknown>> {
  const res = await fetch(`${API_BASE}/generate-note`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      transcript,
      patient_history: patientHistory || null,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Note generation failed" }));
    throw new Error(err.detail || "Note generation failed");
  }

  return res.json();
}

export async function checkInteractions(
  medications: string[]
): Promise<{
  interactions: {
    drug1: string;
    drug2: string;
    severity: string;
    description: string;
  }[];
  checked: boolean;
}> {
  const res = await fetch(`${API_BASE}/check-interactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ medications }),
  });

  if (!res.ok) {
    return { interactions: [], checked: false };
  }

  return res.json();
}

export async function exportPdf(
  soapNote: Record<string, unknown>,
  patientInfo: {
    patient_name: string;
    age: string;
    gender: string;
    doctor_name: string;
  }
): Promise<Blob> {
  const res = await fetch(`${API_BASE}/export-pdf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ soap_note: soapNote, patient_info: patientInfo }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "PDF export failed" }));
    throw new Error(err.detail || "PDF export failed");
  }

  return res.blob();
}

export async function exportFhir(
  soapNote: Record<string, unknown>,
  patientInfo: {
    patient_name: string;
    age: string;
    gender: string;
    doctor_name: string;
  }
): Promise<Record<string, unknown>> {
  const res = await fetch(`${API_BASE}/export-fhir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ soap_note: soapNote, patient_info: patientInfo }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "FHIR export failed" }));
    throw new Error(err.detail || "FHIR export failed");
  }

  return res.json();
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    return data.status === "ok";
  } catch {
    return false;
  }
}
