import type { Metadata } from "next";
import Link from "next/link";
import {
  Mic,
  Brain,
  FileText,
  ShieldCheck,
  Clock,
  Pill,
  ChevronRight,
  Stethoscope,
  Users,
  FileCheck,
} from "lucide-react";

const stats = [
  { value: "1.3M", label: "Doctors in India", icon: Stethoscope },
  { value: "70", label: "Patients/Day", icon: Users },
  { value: "6 Hrs", label: "Lost to Paperwork", icon: Clock },
  { value: "5.6M", label: "Errors/Year", icon: ShieldCheck },
];

const problems = [
  {
    title: "Hours Wasted on Paperwork",
    description:
      "Indian doctors spend 2-3 hours daily on manual documentation instead of treating patients.",
    color: "bg-danger/10 text-danger",
  },
  {
    title: "Illegible Prescriptions",
    description:
      "Handwritten notes cause medication errors. 7% of prescriptions in India have legibility issues.",
    color: "bg-warning/10 text-warning",
  },
  {
    title: "No Digital Records",
    description:
      "Most clinics lack EHR systems. Patient history is lost across visits, leading to repeated tests.",
    color: "bg-primary/10 text-primary",
  },
];

const solutions = [
  {
    title: "Voice → Structured Notes",
    description:
      "Just speak naturally during consultation. Aushadh converts speech into SOAP notes automatically.",
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Clean Digital Prescriptions",
    description:
      "Every prescription is typed, structured, and exportable as PDF with drug interaction warnings.",
    color: "bg-accent/10 text-accent",
  },
  {
    title: "ABDM-Ready Records",
    description:
      "FHIR R4 compliant exports ready for Ayushman Bharat Digital Mission integration.",
    color: "bg-accent/10 text-accent",
  },
];

const steps = [
  {
    step: "01",
    title: "Record Consultation",
    description:
      "Hit record and speak normally with your patient. Aushadh captures everything in real-time.",
    icon: Mic,
  },
  {
    step: "02",
    title: "AI Generates SOAP Note",
    description:
      "Whisper transcribes the audio, Claude AI structures it into a complete clinical note with ICD-10 codes.",
    icon: Brain,
  },
  {
    step: "03",
    title: "Review & Export",
    description:
      "Review the AI-generated note, check drug interactions, approve, and export as PDF or FHIR JSON.",
    icon: FileText,
  },
];

const features = [
  {
    title: "Whisper Transcription",
    description:
      "Local faster-whisper model transcribes Hindi, English, and mixed-code consultations with high accuracy.",
    icon: Mic,
    color: "text-primary",
  },
  {
    title: "Claude AI Processing",
    description:
      "Anthropic Claude analyzes transcripts and generates structured SOAP notes with clinical intelligence.",
    icon: Brain,
    color: "text-accent",
  },
  {
    title: "Drug Interaction Alerts",
    description:
      "Real-time OpenFDA integration flags dangerous drug combinations before prescriptions are finalized.",
    icon: Pill,
    color: "text-danger",
  },
  {
    title: "ICD-10 Auto-Coding",
    description:
      "Every diagnosis is automatically mapped to ICD-10 codes for insurance and compliance purposes.",
    icon: FileCheck,
    color: "text-warning",
  },
  {
    title: "ABDM Compliance",
    description:
      "Exports FHIR R4 resources compatible with India's Ayushman Bharat Digital Mission standards.",
    icon: ShieldCheck,
    color: "text-primary",
  },
  {
    title: "Privacy First",
    description:
      "Patient data stays in your browser's localStorage. No cloud storage, no data leaving your clinic.",
    icon: Users,
    color: "text-accent",
  },
];

export const metadata: Metadata = {
  title: "Aushadh — AI Medical Scribe",
};

export default function Home() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(135deg, #1a5276 0%, #2980b9 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm mb-6 backdrop-blur-sm">
              <Stethoscope className="h-4 w-4" />
              AI-Powered Medical Scribe for India
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Stop Writing Notes.
              <br />
              <span className="text-accent">Start Healing.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Aushadh listens to your consultation, transcribes it in real-time,
              and generates structured SOAP notes with ICD-10 codes — so you can
              focus entirely on your patient.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40"
              >
                Start Consultation
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/patients"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all backdrop-blur-sm"
              >
                Manage Patients
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Problem vs Solution ── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Problems */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Aushadh?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Indian healthcare faces a documentation crisis that costs time,
              money, and lives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {problems.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${p.color}`}
                >
                  Problem
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          {/* Solutions */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The <span className="text-accent">Aushadh</span> Solution
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              AI that works the way Indian doctors do — voice-first, multilingual,
              and privacy-respecting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-accent/20 hover:shadow-md hover:border-accent/40 transition-all"
              >
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${s.color}`}
                >
                  Solution
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Three simple steps from consultation to clinical documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="relative text-center">
                  {/* Connector line between steps */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gray-200" />
                  )}

                  <div className="relative inline-flex items-center justify-center h-24 w-24 rounded-2xl bg-primary/10 mb-6">
                    <Icon className="h-10 w-10 text-primary" />
                    <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Built for Indian Healthcare
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Every feature is designed with Indian clinical workflows in mind.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <div className={`mb-4 ${f.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section
        className="text-white"
        style={{
          background: "linear-gradient(135deg, #1a5276 0%, #2980b9 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Join the future of clinical documentation. Start your first
              AI-powered consultation in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40"
              >
                Start First Consultation
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link
                href="/patients"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all backdrop-blur-sm"
              >
                Register a Patient
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm">
          <p className="mb-2">
            Aushadh — AI Medical Scribe for Indian Doctors
          </p>
          <p className="text-gray-500">
            Built for hackathon demonstration. Requires physician verification
            before clinical use.
          </p>
        </div>
      </footer>
    </>
  );
}
