export const AUSHADH_STORAGE_KEY = "aushadh_patients";

export function getDemoPatients() {
  return [
    {
      id: "PAT-DEMO-001",
      name: "Ravi Kumar",
      age: "45",
      gender: "Male",
      phone: "9876543210",
      allergies: "Penicillin",
      chronic_conditions: "Hypertension, Type 2 Diabetes",
      created_at: "2026-03-01T09:00:00.000Z",
      consultations: [
        {
          id: "CONS-DEMO-001",
          date: "2026-03-01T09:00:00.000Z",
          doctorName: "Dr. Pal",
          transcript:
            "Patient reports persistent morning headaches and elevated home BP readings for the past week, with occasional fatigue after meals.",
          soap_note: {
            subjective: {
              chief_complaint: "High blood pressure and headaches",
              history_of_present_illness:
                "45-year-old male with known hypertension and diabetes presents with one week of occipital headache and elevated home BP around 150-160/90-96.",
              review_of_systems:
                "No chest pain, no breathlessness, no focal neurological deficits. Mild polyuria reported.",
              confidence: "HIGH",
              needs_review: false,
            },
            objective: {
              vitals: "BP: 156/96 mmHg, Pulse: 82/min, Temp: 98.4F",
              physical_exam:
                "Cardiovascular exam normal S1 S2, no pedal edema, chest clear.",
              observations:
                "Capillary blood glucose in clinic elevated at 192 mg/dL.",
              confidence: "HIGH",
              needs_review: false,
            },
            assessment: {
              diagnosis: "Essential Hypertension with Type 2 Diabetes Mellitus",
              differential: "Secondary hypertension, anxiety-related headache",
              icd10_codes: [
                { code: "I10", description: "Essential Hypertension" },
                { code: "E11.9", description: "Type 2 Diabetes Mellitus" },
              ],
              confidence: "HIGH",
              needs_review: false,
            },
            plan: {
              medications: [
                {
                  drug_name: "Amlodipine",
                  dose: "5mg",
                  route: "Oral",
                  frequency: "Once daily",
                  duration: "30 days",
                },
                {
                  drug_name: "Metformin",
                  dose: "500mg",
                  route: "Oral",
                  frequency: "Twice daily after meals",
                  duration: "30 days",
                },
              ],
              tests_ordered: "HbA1c, fasting blood sugar, renal function test",
              follow_up: "Review in 2 weeks",
              confidence: "HIGH",
              needs_review: false,
            },
          },
        },
        {
          id: "CONS-DEMO-002",
          date: "2026-03-07T09:00:00.000Z",
          doctorName: "Dr. Pal",
          transcript:
            "Follow-up visit: headaches improved but evening BP still high; patient also complains of stress-related tension headache during work.",
          soap_note: {
            subjective: {
              chief_complaint: "BP still elevated in evenings, stress headache",
              history_of_present_illness:
                "On Amlodipine 5mg for one week with partial control. Evening readings remain around 148/92. Band-like headache after long office hours.",
              review_of_systems:
                "No visual changes, no vomiting, no focal weakness, sleep mildly disturbed.",
              confidence: "HIGH",
              needs_review: false,
            },
            objective: {
              vitals: "BP: 148/92 mmHg, Pulse: 78/min, Temp: 98.6F",
              physical_exam:
                "General exam stable, no meningeal signs, neurological exam grossly normal.",
              observations:
                "BP improving but not yet at target.",
              confidence: "HIGH",
              needs_review: false,
            },
            assessment: {
              diagnosis: "Essential Hypertension with Tension Headache",
              differential: "Migraine without aura, medication-overuse headache",
              icd10_codes: [
                { code: "I10", description: "Essential Hypertension" },
                { code: "G44.209", description: "Tension Headache" },
              ],
              confidence: "HIGH",
              needs_review: false,
            },
            plan: {
              medications: [
                {
                  drug_name: "Amlodipine",
                  dose: "10mg",
                  route: "Oral",
                  frequency: "Once daily",
                  duration: "30 days",
                },
                {
                  drug_name: "Paracetamol",
                  dose: "500mg",
                  route: "Oral",
                  frequency: "SOS up to 3 times daily",
                  duration: "5 days",
                },
              ],
              tests_ordered: "Home BP charting for 7 days",
              follow_up: "Review in 2 weeks",
              confidence: "HIGH",
              needs_review: false,
            },
          },
        },
        {
          id: "CONS-DEMO-003",
          date: "2026-03-13T09:00:00.000Z",
          doctorName: "Dr. Pal",
          transcript:
            "Third follow-up: BP controlled better, sugars still high post-prandial. No new complaints.",
          soap_note: {
            subjective: {
              chief_complaint: "Routine follow-up for BP and diabetes",
              history_of_present_illness:
                "Home BP now mostly 132-138/84-88. Post-meal sugars continue to be elevated around 210 mg/dL.",
              review_of_systems:
                "No headache, no dizziness, no chest pain, no hypoglycemia symptoms.",
              confidence: "HIGH",
              needs_review: false,
            },
            objective: {
              vitals: "BP: 136/86 mmHg, Pulse: 76/min, Temp: 98.5F",
              physical_exam:
                "Stable cardiovascular and respiratory examination.",
              observations: "Blood pressure near target; glycemic control suboptimal.",
              confidence: "HIGH",
              needs_review: false,
            },
            assessment: {
              diagnosis: "Type 2 Diabetes Mellitus with Essential Hypertension",
              differential: "Medication non-adherence, dietary non-compliance",
              icd10_codes: [
                { code: "E11.9", description: "Type 2 Diabetes Mellitus" },
                { code: "I10", description: "Essential Hypertension" },
              ],
              confidence: "HIGH",
              needs_review: false,
            },
            plan: {
              medications: [
                {
                  drug_name: "Amlodipine",
                  dose: "10mg",
                  route: "Oral",
                  frequency: "Once daily",
                  duration: "30 days",
                },
                {
                  drug_name: "Metformin",
                  dose: "1000mg",
                  route: "Oral",
                  frequency: "Twice daily after meals",
                  duration: "30 days",
                },
                {
                  drug_name: "Atorvastatin",
                  dose: "40mg",
                  route: "Oral",
                  frequency: "Once nightly",
                  duration: "30 days",
                },
              ],
              tests_ordered: "HbA1c after 6 weeks, lipid profile",
              follow_up: "Review in 2 weeks",
              confidence: "HIGH",
              needs_review: false,
            },
          },
        },
      ],
    },
    {
      id: "PAT-DEMO-002",
      name: "Priya Sharma",
      age: "32",
      gender: "Female",
      phone: "9845012345",
      allergies: "Sulfa drugs",
      chronic_conditions: "Asthma",
      created_at: "2026-03-03T10:00:00.000Z",
      consultations: [
        {
          id: "CONS-DEMO-004",
          date: "2026-03-03T09:00:00.000Z",
          doctorName: "Dr. Pal",
          transcript:
            "Patient presents with wheeze, dry cough, and breathlessness after dust exposure for two days.",
          soap_note: {
            subjective: {
              chief_complaint: "Wheezing and shortness of breath",
              history_of_present_illness:
                "Known asthmatic with acute worsening after cleaning house. Uses rescue inhaler frequently since yesterday.",
              review_of_systems:
                "No fever, mild throat irritation, no chest pain.",
              confidence: "HIGH",
              needs_review: false,
            },
            objective: {
              vitals: "BP: 124/80 mmHg, Pulse: 96/min, Temp: 98.7F",
              physical_exam:
                "Bilateral expiratory wheeze heard, no cyanosis.",
              observations:
                "Mild-moderate asthma flare, oxygenation clinically adequate.",
              confidence: "HIGH",
              needs_review: false,
            },
            assessment: {
              diagnosis: "Asthma exacerbation",
              differential: "Acute bronchitis, allergic rhinitis with post-nasal drip",
              icd10_codes: [
                { code: "J45.901", description: "Asthma exacerbation" },
              ],
              confidence: "HIGH",
              needs_review: false,
            },
            plan: {
              medications: [
                {
                  drug_name: "Salbutamol inhaler",
                  dose: "2 puffs",
                  route: "Inhalation",
                  frequency: "Every 6 hours as needed",
                  duration: "10 days",
                },
                {
                  drug_name: "Montelukast",
                  dose: "10mg",
                  route: "Oral",
                  frequency: "Once nightly",
                  duration: "30 days",
                },
              ],
              tests_ordered: "Peak flow monitoring",
              follow_up: "Review in 2 weeks",
              confidence: "HIGH",
              needs_review: false,
            },
          },
        },
        {
          id: "CONS-DEMO-005",
          date: "2026-03-10T09:00:00.000Z",
          doctorName: "Dr. Pal",
          transcript:
            "Follow-up: breathing improved, now has mild sore throat and cold symptoms for one day.",
          soap_note: {
            subjective: {
              chief_complaint: "Mild cold symptoms with occasional cough",
              history_of_present_illness:
                "Asthma symptoms improved on inhaler. Developed sneezing and throat discomfort since yesterday.",
              review_of_systems:
                "No high fever, no breathlessness at rest, appetite preserved.",
              confidence: "HIGH",
              needs_review: false,
            },
            objective: {
              vitals: "BP: 122/78 mmHg, Pulse: 84/min, Temp: 99.0F",
              physical_exam:
                "Mild pharyngeal congestion, occasional wheeze.",
              observations:
                "Likely viral URI with background reactive airway disease.",
              confidence: "HIGH",
              needs_review: false,
            },
            assessment: {
              diagnosis: "Acute Upper Respiratory Infection with Asthma exacerbation",
              differential: "Seasonal flu, allergic pharyngitis",
              icd10_codes: [
                { code: "J06.9", description: "Acute Upper Respiratory Infection" },
                { code: "J45.901", description: "Asthma exacerbation" },
              ],
              confidence: "HIGH",
              needs_review: false,
            },
            plan: {
              medications: [
                {
                  drug_name: "Salbutamol inhaler",
                  dose: "2 puffs",
                  route: "Inhalation",
                  frequency: "Every 8 hours as needed",
                  duration: "7 days",
                },
                {
                  drug_name: "Montelukast",
                  dose: "10mg",
                  route: "Oral",
                  frequency: "Once nightly",
                  duration: "30 days",
                },
                {
                  drug_name: "Paracetamol",
                  dose: "500mg",
                  route: "Oral",
                  frequency: "Every 8 hours as needed",
                  duration: "3 days",
                },
              ],
              tests_ordered: "No immediate tests required",
              follow_up: "Review in 2 weeks",
              confidence: "HIGH",
              needs_review: false,
            },
          },
        },
      ],
    },
    {
      id: "PAT-DEMO-003",
      name: "Arjun Patel",
      age: "58",
      gender: "Male",
      phone: "9900112233",
      allergies: "",
      chronic_conditions: "Coronary Artery Disease, Hypertension",
      created_at: "2026-03-05T11:00:00.000Z",
      consultations: [
        {
          id: "CONS-DEMO-006",
          date: "2026-03-05T09:00:00.000Z",
          doctorName: "Dr. Pal",
          transcript:
            "Patient complains of exertional chest tightness for three days, relieved with rest.",
          soap_note: {
            subjective: {
              chief_complaint: "Chest pain on exertion",
              history_of_present_illness:
                "58-year-old male with CAD history reports substernal pressure while climbing stairs, lasting 5-10 minutes, relieved with rest.",
              review_of_systems:
                "No syncope, no severe breathlessness, no fever.",
              confidence: "HIGH",
              needs_review: false,
            },
            objective: {
              vitals: "BP: 150/94 mmHg, Pulse: 88/min, Temp: 98.3F",
              physical_exam:
                "Cardiac exam regular rhythm, no murmurs, lungs clear.",
              observations:
                "High cardiovascular risk profile requiring medication optimization.",
              confidence: "HIGH",
              needs_review: false,
            },
            assessment: {
              diagnosis: "Stable Angina with Essential Hypertension",
              differential: "GERD-related chest pain, musculoskeletal chest wall pain",
              icd10_codes: [
                { code: "I20.9", description: "Stable Angina" },
                { code: "I10", description: "Essential Hypertension" },
              ],
              confidence: "HIGH",
              needs_review: false,
            },
            plan: {
              medications: [
                {
                  drug_name: "Aspirin",
                  dose: "75mg",
                  route: "Oral",
                  frequency: "Once daily",
                  duration: "30 days",
                },
                {
                  drug_name: "Atorvastatin",
                  dose: "40mg",
                  route: "Oral",
                  frequency: "Once nightly",
                  duration: "30 days",
                },
                {
                  drug_name: "Amlodipine",
                  dose: "5mg",
                  route: "Oral",
                  frequency: "Once daily",
                  duration: "30 days",
                },
              ],
              tests_ordered: "ECG and fasting lipid profile",
              follow_up: "Review in 2 weeks",
              confidence: "HIGH",
              needs_review: false,
            },
          },
        },
        {
          id: "CONS-DEMO-007",
          date: "2026-03-12T09:00:00.000Z",
          doctorName: "Dr. Pal",
          transcript:
            "Follow-up after ECG: chest pain frequency reduced, BP borderline high.",
          soap_note: {
            subjective: {
              chief_complaint: "Follow-up for chest pain",
              history_of_present_illness:
                "Symptoms decreased after medication compliance, occasional exertional discomfort persists.",
              review_of_systems:
                "No rest pain, no palpitations, no pedal edema.",
              confidence: "HIGH",
              needs_review: false,
            },
            objective: {
              vitals: "BP: 146/90 mmHg, Pulse: 80/min, Temp: 98.4F",
              physical_exam:
                "Cardiorespiratory exam stable.",
              observations:
                "ECG reviewed with no acute ischemic changes.",
              confidence: "HIGH",
              needs_review: false,
            },
            assessment: {
              diagnosis: "Stable Angina",
              differential: "Microvascular angina, non-cardiac chest discomfort",
              icd10_codes: [
                { code: "I20.9", description: "Stable Angina" },
              ],
              confidence: "HIGH",
              needs_review: false,
            },
            plan: {
              medications: [
                {
                  drug_name: "Aspirin",
                  dose: "75mg",
                  route: "Oral",
                  frequency: "Once daily",
                  duration: "30 days",
                },
                {
                  drug_name: "Atorvastatin",
                  dose: "40mg",
                  route: "Oral",
                  frequency: "Once nightly",
                  duration: "30 days",
                },
                {
                  drug_name: "Amlodipine",
                  dose: "10mg",
                  route: "Oral",
                  frequency: "Once daily",
                  duration: "30 days",
                },
              ],
              tests_ordered: "TMT if symptoms persist",
              follow_up: "Review in 2 weeks",
              confidence: "HIGH",
              needs_review: false,
            },
          },
        },
      ],
    },
    {
      id: "PAT-DEMO-004",
      name: "Meera Nair",
      age: "28",
      gender: "Female",
      phone: "9812345678",
      allergies: "",
      chronic_conditions: "",
      created_at: "2026-03-08T09:00:00.000Z",
      consultations: [
        {
          id: "CONS-DEMO-008",
          date: "2026-03-08T09:00:00.000Z",
          doctorName: "Dr. Pal",
          transcript:
            "Patient reports low-grade fever, sore throat, and runny nose since yesterday.",
          soap_note: {
            subjective: {
              chief_complaint: "Fever and cold symptoms",
              history_of_present_illness:
                "1 day history of sore throat, rhinorrhea, and mild body ache.",
              review_of_systems:
                "No breathlessness, no chest pain, no vomiting.",
              confidence: "HIGH",
              needs_review: false,
            },
            objective: {
              vitals: "BP: 110/72 mmHg, Pulse: 86/min, Temp: 99.4F",
              physical_exam:
                "Mild throat congestion, chest clear, no lymphadenopathy.",
              observations: "Likely uncomplicated viral upper respiratory infection.",
              confidence: "HIGH",
              needs_review: false,
            },
            assessment: {
              diagnosis: "Acute Upper Respiratory Infection",
              differential: "Allergic rhinitis, early influenza",
              icd10_codes: [
                { code: "J06.9", description: "Acute Upper Respiratory Infection" },
              ],
              confidence: "HIGH",
              needs_review: false,
            },
            plan: {
              medications: [
                {
                  drug_name: "Paracetamol",
                  dose: "500mg",
                  route: "Oral",
                  frequency: "Every 8 hours as needed",
                  duration: "3 days",
                },
                {
                  drug_name: "Montelukast",
                  dose: "10mg",
                  route: "Oral",
                  frequency: "Once nightly",
                  duration: "5 days",
                },
              ],
              tests_ordered: "No tests required currently",
              follow_up: "Review in 2 weeks",
              confidence: "HIGH",
              needs_review: false,
            },
          },
        },
      ],
    },
    {
      id: "PAT-DEMO-005",
      name: "Suresh Reddy",
      age: "67",
      gender: "Male",
      phone: "9700123456",
      allergies: "Aspirin",
      chronic_conditions: "COPD, Type 2 Diabetes, Hypertension",
      created_at: "2026-03-10T08:00:00.000Z",
      consultations: [
        {
          id: "CONS-DEMO-009",
          date: "2026-03-10T09:00:00.000Z",
          doctorName: "Dr. Pal",
          transcript:
            "Patient with COPD reports increased cough, sputum, and breathlessness over 3 days; also due for diabetes review.",
          soap_note: {
            subjective: {
              chief_complaint: "Breathlessness and productive cough",
              history_of_present_illness:
                "Known COPD with recent worsening after weather change; blood sugars also fluctuating.",
              review_of_systems:
                "No chest pain, no hemoptysis, mild exertional fatigue.",
              confidence: "HIGH",
              needs_review: false,
            },
            objective: {
              vitals: "BP: 152/90 mmHg, Pulse: 94/min, Temp: 98.8F",
              physical_exam:
                "Bilateral rhonchi present, prolonged expiration, no cyanosis.",
              observations:
                "Acute COPD flare with uncontrolled chronic comorbidities.",
              confidence: "HIGH",
              needs_review: false,
            },
            assessment: {
              diagnosis: "COPD exacerbation with Type 2 Diabetes Mellitus and Essential Hypertension",
              differential: "Lower respiratory tract infection, heart failure exacerbation",
              icd10_codes: [
                { code: "J44.1", description: "COPD exacerbation" },
                { code: "E11.9", description: "Type 2 Diabetes Mellitus" },
                { code: "I10", description: "Essential Hypertension" },
              ],
              confidence: "HIGH",
              needs_review: false,
            },
            plan: {
              medications: [
                {
                  drug_name: "Tiotropium inhaler",
                  dose: "18mcg",
                  route: "Inhalation",
                  frequency: "Once daily",
                  duration: "30 days",
                },
                {
                  drug_name: "Salbutamol inhaler",
                  dose: "2 puffs",
                  route: "Inhalation",
                  frequency: "Every 6 hours as needed",
                  duration: "10 days",
                },
                {
                  drug_name: "Metformin",
                  dose: "500mg",
                  route: "Oral",
                  frequency: "Twice daily after meals",
                  duration: "30 days",
                },
                {
                  drug_name: "Amlodipine",
                  dose: "5mg",
                  route: "Oral",
                  frequency: "Once daily",
                  duration: "30 days",
                },
              ],
              tests_ordered: "Chest X-ray, HbA1c, CBC",
              follow_up: "Review in 2 weeks",
              confidence: "HIGH",
              needs_review: false,
            },
          },
        },
        {
          id: "CONS-DEMO-010",
          date: "2026-03-13T09:00:00.000Z",
          doctorName: "Dr. Pal",
          transcript:
            "Follow-up: cough improved, breathing better, fasting sugars still high in home records.",
          soap_note: {
            subjective: {
              chief_complaint: "Follow-up for COPD and diabetes",
              history_of_present_illness:
                "Symptomatic respiratory improvement after inhaler adherence; persistent hyperglycemia noted.",
              review_of_systems:
                "No fever, less sputum, no nocturnal severe dyspnea.",
              confidence: "HIGH",
              needs_review: false,
            },
            objective: {
              vitals: "BP: 146/88 mmHg, Pulse: 86/min, Temp: 98.4F",
              physical_exam:
                "Mild bilateral wheeze, overall improved air entry.",
              observations:
                "COPD exacerbation resolving; diabetes control needs intensification.",
              confidence: "HIGH",
              needs_review: false,
            },
            assessment: {
              diagnosis: "Type 2 Diabetes Mellitus with COPD exacerbation",
              differential: "Steroid-induced hyperglycemia, dietary non-compliance",
              icd10_codes: [
                { code: "E11.9", description: "Type 2 Diabetes Mellitus" },
                { code: "J44.1", description: "COPD exacerbation" },
              ],
              confidence: "HIGH",
              needs_review: false,
            },
            plan: {
              medications: [
                {
                  drug_name: "Tiotropium inhaler",
                  dose: "18mcg",
                  route: "Inhalation",
                  frequency: "Once daily",
                  duration: "30 days",
                },
                {
                  drug_name: "Metformin",
                  dose: "1000mg",
                  route: "Oral",
                  frequency: "Twice daily after meals",
                  duration: "30 days",
                },
                {
                  drug_name: "Amlodipine",
                  dose: "10mg",
                  route: "Oral",
                  frequency: "Once daily",
                  duration: "30 days",
                },
              ],
              tests_ordered: "Repeat HbA1c in 6 weeks",
              follow_up: "Review in 2 weeks",
              confidence: "HIGH",
              needs_review: false,
            },
          },
        },
      ],
    },
  ];
}

export function seedDemoData() {
  if (typeof window === "undefined") return false;

  let parsed: any[] = [];
  try {
    const existing = localStorage.getItem(AUSHADH_STORAGE_KEY);
    parsed = existing ? JSON.parse(existing) : [];
  } catch {
    parsed = [];
  }

  const hasDemoData = (parsed || [])?.some((p: any) => p?.id?.startsWith?.("PAT-DEMO"));
  if (hasDemoData) return false;

  const demoPatients = getDemoPatients();
  const merged = [...demoPatients, ...(parsed || [])];
  localStorage.setItem(AUSHADH_STORAGE_KEY, JSON.stringify(merged));
  return true;
}
