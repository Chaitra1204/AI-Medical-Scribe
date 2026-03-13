"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllPatients } from "@/services/ehr";
import Navbar from "@/components/Navbar";

type ConsultationRow = {
  date?: string;
  patientName?: string;
  doctorName?: string;
  diagnosis?: string;
  icd10?: string;
};

function dayKey(value?: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date?.getTime())) return "";
  return `${date?.getFullYear()}-${String(date?.getMonth() + 1).padStart(2, "0")}-${String(
    date?.getDate()
  ).padStart(2, "0")}`;
}

function prettyDate(value?: string): string {
  if (!value) return "No data";
  const date = new Date(value);
  if (Number.isNaN(date?.getTime())) return "No data";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function prettyDateTime(value?: string): string {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date?.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    document.title = "Analytics — Aushadh";
    setPatients(getAllPatients() || []);
  }, []);

  const totalPatients = patients?.length || 0;

  const allConsultations: any[] = [];
  const consultationRows: ConsultationRow[] = [];

  (patients || [])?.forEach((patient: any) => {
    (patient?.consultations || [])?.forEach((consultation: any) => {
      allConsultations.push({
        ...consultation,
        patientName: patient?.name,
      });

      const icdCodes = (consultation?.soap_note?.assessment?.icd10_codes || [])
        ?.map((codeItem: any) => codeItem?.code)
        ?.filter((code: string) => Boolean(code))
        ?.join(", ");

      consultationRows.push({
        date: consultation?.date,
        patientName: patient?.name,
        doctorName: consultation?.doctorName,
        diagnosis: consultation?.soap_note?.assessment?.diagnosis,
        icd10: icdCodes || "-",
      });
    });
  });

  const totalConsultations = allConsultations?.length || 0;

  const consultationsByDay: Record<string, number> = {};
  (allConsultations || [])?.forEach((consultation: any) => {
    const key = dayKey(consultation?.date);
    if (key) {
      consultationsByDay[key] = (consultationsByDay[key] || 0) + 1;
    }
  });

  let mostActiveDayKey = "";
  let mostActiveDayCount = 0;
  Object.keys(consultationsByDay)?.forEach((key) => {
    const count = consultationsByDay?.[key] || 0;
    if (count > mostActiveDayCount) {
      mostActiveDayCount = count;
      mostActiveDayKey = key;
    }
  });

  const diagnosisCounts: Record<string, number> = {};
  patients?.forEach((p: any) => {
    p?.consultations?.forEach((c: any) => {
      const diag = c?.soap_note?.assessment?.diagnosis;
      if (diag) {
        diagnosisCounts[diag] = (diagnosisCounts[diag] || 0) + 1;
      }
    });
  });

  const topDiagnoses = Object.keys(diagnosisCounts)
    ?.map((name) => ({ name, count: diagnosisCounts?.[name] || 0 }))
    ?.sort((a, b) => b?.count - a?.count)
    ?.slice(0, 5);

  const medicationCounts: Record<string, number> = {};
  patients?.forEach((p: any) => {
    p?.consultations?.forEach((c: any) => {
      (c?.soap_note?.plan?.medications || [])?.forEach((med: any) => {
        const drugName = med?.drug_name;
        if (drugName) {
          medicationCounts[drugName] = (medicationCounts[drugName] || 0) + 1;
        }
      });
    });
  });

  const topMedications = Object.keys(medicationCounts)
    ?.map((name) => ({ name, count: medicationCounts?.[name] || 0 }))
    ?.sort((a, b) => b?.count - a?.count)
    ?.slice(0, 5);

  const recentTimeline = Array.from({ length: 7 })
    ?.map((_, idx) => {
      const date = new Date();
      date?.setHours(0, 0, 0, 0);
      date?.setDate(date?.getDate() - (6 - idx));
      const key = `${date?.getFullYear()}-${String(date?.getMonth() + 1).padStart(2, "0")}-${String(
        date?.getDate()
      ).padStart(2, "0")}`;
      const label = new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
      }).format(date);
      return {
        key,
        label,
        count: consultationsByDay?.[key] || 0,
      };
    })
    ?.sort((a, b) => a?.key?.localeCompare(b?.key));

  const maxTimeline = Math.max(...recentTimeline?.map((item) => item?.count), 1);

  const genderCounts: Record<string, number> = {
    Male: 0,
    Female: 0,
    Other: 0,
  };

  (patients || [])?.forEach((patient: any) => {
    const rawGender = (patient?.gender || "Other")?.toLowerCase?.();
    if (rawGender === "male") {
      genderCounts["Male"] = (genderCounts?.["Male"] || 0) + 1;
      return;
    }
    if (rawGender === "female") {
      genderCounts["Female"] = (genderCounts?.["Female"] || 0) + 1;
      return;
    }
    genderCounts["Other"] = (genderCounts?.["Other"] || 0) + 1;
  });

  const totalGender = (genderCounts?.Male || 0) + (genderCounts?.Female || 0) + (genderCounts?.Other || 0);

  const recentConsultations = [...consultationRows]
    ?.sort((a, b) => {
      const aTime = new Date(a?.date || "").getTime();
      const bTime = new Date(b?.date || "").getTime();
      return bTime - aTime;
    })
    ?.slice(0, 10);

  const noData = totalPatients === 0 || totalConsultations === 0;

  const maxDiagnosis = Math.max(...topDiagnoses?.map((item) => item?.count), 1);
  const maxMedications = Math.max(...topMedications?.map((item) => item?.count), 1);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="pt-16">
        <div className="bg-[#1a5276] text-white px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="mt-2 text-white/85">Practice insights from your consultations</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {noData ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white min-h-[55vh] flex items-center justify-center p-6 shadow-sm">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">
                  No data yet — complete a consultation to see insights
                </p>
                <button
                  onClick={() => router?.push("/consultation")}
                  className="mt-4 rounded-xl bg-[#1a5276] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#15435f]"
                >
                  Start New Consultation
                </button>
              </div>
            </div>
          ) : (
            <>
              <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-blue-600 text-white p-4 shadow-sm">
                  <p className="text-2xl">👥</p>
                  <p className="mt-3 text-sm text-blue-100">Total Patients</p>
                  <p className="text-2xl font-bold">{totalPatients}</p>
                </div>

                <div className="rounded-2xl bg-green-600 text-white p-4 shadow-sm">
                  <p className="text-2xl">📋</p>
                  <p className="mt-3 text-sm text-green-100">Total Consultations</p>
                  <p className="text-2xl font-bold">{totalConsultations}</p>
                </div>

                <div className="rounded-2xl bg-orange-500 text-white p-4 shadow-sm">
                  <p className="text-2xl">⚠️</p>
                  <p className="mt-3 text-sm text-orange-100">Drug Interactions Caught</p>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-orange-100">Coming Soon</p>
                </div>

                <div className="rounded-2xl bg-purple-600 text-white p-4 shadow-sm">
                  <p className="text-2xl">📅</p>
                  <p className="mt-3 text-sm text-purple-100">Most Active Day</p>
                  <p className="text-lg font-bold">{mostActiveDayKey ? prettyDate(mostActiveDayKey) : "No data"}</p>
                </div>
              </section>

              <section className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
                    <h2 className="text-lg font-semibold text-[#1a5276]">Top Diagnoses</h2>
                    <div className="mt-4 space-y-3">
                      {topDiagnoses?.length === 0 ? (
                        <p className="text-sm text-gray-500">No diagnoses recorded</p>
                      ) : (
                        topDiagnoses?.map((item) => (
                          <div key={item?.name} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] items-center gap-3">
                            <p className="text-sm text-gray-700 truncate">{item?.name}</p>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#1a5276]"
                                style={{ width: `${((item?.count || 0) / maxDiagnosis) * 100}%` }}
                              />
                            </div>
                            <p className="text-sm font-semibold text-gray-800">{item?.count}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
                    <h2 className="text-lg font-semibold text-[#1a5276]">Top Medications Prescribed</h2>
                    <div className="mt-4 space-y-3">
                      {topMedications?.length === 0 ? (
                        <p className="text-sm text-gray-500">No medications recorded</p>
                      ) : (
                        topMedications?.map((item) => (
                          <div key={item?.name} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] items-center gap-3">
                            <p className="text-sm text-gray-700 truncate">{item?.name}</p>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#2ecc71]"
                                style={{ width: `${((item?.count || 0) / maxMedications) * 100}%` }}
                              />
                            </div>
                            <p className="text-sm font-semibold text-gray-800">{item?.count}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
                    <h2 className="text-lg font-semibold text-[#1a5276]">Recent Consultations Timeline</h2>
                    <div className="mt-5 h-64 flex items-end justify-between gap-2">
                      {recentTimeline?.map((item) => {
                        const heightPercent = ((item?.count || 0) / maxTimeline) * 100;
                        return (
                          <div key={item?.key} className="flex-1 min-w-0 flex flex-col items-center justify-end">
                            <p className="text-xs text-gray-600 mb-1">{item?.count}</p>
                            <div
                              className={item?.count === 0 ? "w-full max-w-[38px] rounded-t-md bg-gray-300" : "w-full max-w-[38px] rounded-t-md bg-[#1a5276]"}
                              style={{ height: `${item?.count === 0 ? 12 : Math.max(18, heightPercent)}%` }}
                            />
                            <p className="mt-2 text-[11px] text-gray-600 text-center">{item?.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
                    <h2 className="text-lg font-semibold text-[#1a5276]">Patient Demographics</h2>
                    <div className="mt-4 space-y-3">
                      {[
                        { label: "Male", color: "bg-blue-600", value: genderCounts?.Male || 0 },
                        { label: "Female", color: "bg-pink-500", value: genderCounts?.Female || 0 },
                        { label: "Other", color: "bg-gray-500", value: genderCounts?.Other || 0 },
                      ]?.map((item) => {
                        const pct = totalGender > 0 ? Math.round(((item?.value || 0) / totalGender) * 100) : 0;
                        return (
                          <div key={item?.label}>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <p className="text-gray-700">{item?.label}</p>
                              <p className="font-semibold text-gray-800">{pct}%</p>
                            </div>
                            <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                              <div className={`h-full ${item?.color}`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-6 rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
                <h2 className="text-lg font-semibold text-[#1a5276]">Recent Consultations</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left bg-gray-100 text-gray-700">
                        <th className="px-3 py-2 font-semibold">Date</th>
                        <th className="px-3 py-2 font-semibold">Patient Name</th>
                        <th className="px-3 py-2 font-semibold">Doctor</th>
                        <th className="px-3 py-2 font-semibold">Diagnosis</th>
                        <th className="px-3 py-2 font-semibold">ICD-10</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentConsultations?.map((row, index) => (
                        <tr key={`${row?.date || "row"}-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-3 py-2 text-gray-700">{prettyDateTime(row?.date)}</td>
                          <td className="px-3 py-2 text-gray-700">{row?.patientName || "Unknown"}</td>
                          <td className="px-3 py-2 text-gray-700">{row?.doctorName || "Not specified"}</td>
                          <td className="px-3 py-2 text-gray-700">{row?.diagnosis || "Not recorded"}</td>
                          <td className="px-3 py-2 text-gray-700">{row?.icd10 || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
