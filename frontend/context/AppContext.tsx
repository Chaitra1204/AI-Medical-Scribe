"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// ── Types ──

export interface Patient {
  id: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  allergies: string;
  chronic_conditions: string;
  consultations: Consultation[];
  created_at: string;
}

export interface Consultation {
  id: string;
  date: string;
  transcript: string;
  soap_note: SOAPNote | null;
  audio_duration: number;
}

export interface SOAPNote {
  subjective: {
    chief_complaint: string;
    history_of_present_illness: string;
    review_of_systems: string;
    confidence: string;
    needs_review: boolean;
  };
  objective: {
    vitals: string;
    physical_exam: string;
    observations: string;
    confidence: string;
    needs_review: boolean;
  };
  assessment: {
    diagnosis: string;
    differential: string;
    icd10_codes: { code: string; description: string }[];
    confidence: string;
    needs_review: boolean;
  };
  plan: {
    medications: {
      drug_name: string;
      dose: string;
      route: string;
      frequency: string;
      duration: string;
    }[];
    tests_ordered: string;
    follow_up: string;
    confidence: string;
    needs_review: boolean;
  };
}

interface AppContextType {
  // Patient state
  patients: Patient[];
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  searchPatients: (query: string) => Patient[];

  // Consultation state
  currentConsultation: Consultation | null;
  setCurrentConsultation: (consultation: Consultation | null) => void;
  addConsultation: (patientId: string, consultation: Consultation) => void;

  // UI state
  isRecording: boolean;
  setIsRecording: (val: boolean) => void;
  doctorName: string;
  setDoctorName: (name: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = "aushadh_patients";
const DOCTOR_KEY = "aushadh_doctor";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [currentConsultation, setCurrentConsultation] = useState<Consultation | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [doctorName, setDoctorName] = useState("Doctor");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPatients(JSON.parse(stored));
      } catch {
        setPatients([]);
      }
    }
    const doc = localStorage.getItem(DOCTOR_KEY);
    if (doc) setDoctorName(doc);
  }, []);

  // Persist patients to localStorage on change
  useEffect(() => {
    if (patients.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    }
  }, [patients]);

  // Persist doctor name
  useEffect(() => {
    localStorage.setItem(DOCTOR_KEY, doctorName);
  }, [doctorName]);

  const addPatient = useCallback((patient: Patient) => {
    setPatients((prev) => [...prev, patient]);
  }, []);

  const updatePatient = useCallback((updated: Patient) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  }, []);

  const searchPatients = useCallback(
    (query: string) => {
      const q = query.toLowerCase();
      return patients.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.id.includes(q)
      );
    },
    [patients]
  );

  const addConsultation = useCallback(
    (patientId: string, consultation: Consultation) => {
      setPatients((prev) =>
        prev.map((p) => {
          if (p.id === patientId) {
            return { ...p, consultations: [...p.consultations, consultation] };
          }
          return p;
        })
      );
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
        patients,
        currentPatient,
        setCurrentPatient,
        addPatient,
        updatePatient,
        searchPatients,
        currentConsultation,
        setCurrentConsultation,
        addConsultation,
        isRecording,
        setIsRecording,
        doctorName,
        setDoctorName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
