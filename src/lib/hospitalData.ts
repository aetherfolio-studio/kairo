export interface Patient {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  bloodGroup: string;
  department: string;
  assignedDoctor: string;
  status: 'Admitted' | 'Outpatient' | 'In Surgery' | 'Discharged';
  room?: string;
  phone: string;
  email: string;
  lastVisit: string;
  admissionDate?: string;
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygenLevel: string;
  };
  medicalHistory: string[];
  prescriptions: { medicine: string; dosage: string; frequency: string }[];
  billingSummary: { total: number; pending: number; insurance: string };
  clinicalNotes: string;
}

export interface Appointment {
  id: string;
  time: string;
  date: string;
  patientName: string;
  patientId: string;
  department: string;
  doctor: string;
  type: 'Consultation' | 'Follow-up' | 'Checkup' | 'Surgical Review' | 'Diagnostic';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled' | 'In Progress';
  room: string;
  notes?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headDoctor: string;
  occupancyPercent: number;
  totalBeds: number;
  occupiedBeds: number;
  waitTimeMinutes: number;
  staffOnDuty: number;
  activeAlerts: number;
  description: string;
  category: 'Critical Care' | 'Specialty' | 'General' | 'Diagnostic';
}

export interface WardCapacity {
  id: string;
  wardName: string;
  category: 'ICU' | 'General' | 'Private' | 'Emergency' | 'Maternity';
  occupied: number;
  total: number;
  available: number;
  reserved: number;
  percentage: number;
  status: 'Optimal' | 'Near Capacity' | 'Critical';
  nurseInCharge: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientName: string;
  patientId: string;
  department: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Insurance Claim' | 'Overdue';
  insuranceProvider?: string;
  services: { name: string; cost: number }[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  specialty: string;
  status: 'On Duty' | 'In Surgery' | 'On Call' | 'Off Duty';
  email: string;
  phone: string;
  avatar: string;
  room: string;
  patientsAssigned: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Pharmaceuticals' | 'Surgical' | 'PPE & Consumables' | 'Diagnostics';
  stockLevel: number;
  minThreshold: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Critical';
  location: string;
  lastRestocked: string;
}

export interface AiInsight {
  id: string;
  title: string;
  description: string;
  category: 'Capacity' | 'Staffing' | 'Schedule' | 'Inventory' | 'Clinical Flow';
  severity: 'info' | 'warning' | 'urgent';
  metricHighlight: string;
  suggestedAction: string;
  timestamp: string;
}

export interface ResourceArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: { name: string; role: string; avatar: string };
  keyTakeaways: string[];
  content: string[];
}

// ----------------------------------------------------
// DEMO DATASETS (All Clearly Fictional / Illustrative)
// ----------------------------------------------------

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    patientId: 'PT-8942',
    name: 'Robert Johnson',
    age: 54,
    gender: 'Male',
    bloodGroup: 'O+',
    department: 'Cardiology',
    assignedDoctor: 'Dr. Sarah Chen',
    status: 'Admitted',
    room: 'Ward 4B - Bed 12',
    phone: '+1 (555) 234-5678',
    email: 'robert.j@example.com',
    lastVisit: 'Today, 08:30 AM',
    admissionDate: 'May 10, 2026',
    vitals: {
      bloodPressure: '128/82 mmHg',
      heartRate: '74 bpm',
      temperature: '98.6 °F',
      oxygenLevel: '98%'
    },
    medicalHistory: [
      'Hypertension diagnosed in 2021',
      'Mild coronary artery calcification',
      'No known pharmaceutical allergies'
    ],
    prescriptions: [
      { medicine: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime' },
      { medicine: 'Lisinopril', dosage: '10mg', frequency: 'Once daily in morning' }
    ],
    billingSummary: { total: 4850, pending: 650, insurance: 'BlueCross Health Plan' },
    clinicalNotes: 'Post-angiography stable recovery. Scheduled for ultrasound echocardiogram review on Thursday.'
  },
  {
    id: 'pat-2',
    patientId: 'PT-8943',
    name: 'Emma Davis',
    age: 38,
    gender: 'Female',
    bloodGroup: 'A+',
    department: 'Neurology',
    assignedDoctor: 'Dr. Michael Chang',
    status: 'Outpatient',
    phone: '+1 (555) 345-6789',
    email: 'emma.davis@example.com',
    lastVisit: 'Today, 09:30 AM',
    vitals: {
      bloodPressure: '118/75 mmHg',
      heartRate: '68 bpm',
      temperature: '98.4 °F',
      oxygenLevel: '99%'
    },
    medicalHistory: [
      'Chronic migraine with visual aura',
      'Cervical spine tension'
    ],
    prescriptions: [
      { medicine: 'Sumatriptan', dosage: '50mg', frequency: 'As needed for acute onset' },
      { medicine: 'Magnesium Glycinate', dosage: '400mg', frequency: 'Daily supplement' }
    ],
    billingSummary: { total: 1200, pending: 0, insurance: 'Aetna Premier Care' },
    clinicalNotes: 'MRI brain scan clear of focal lesions. Prescribed preventative lifestyle regimen.'
  },
  {
    id: 'pat-3',
    patientId: 'PT-8944',
    name: 'Michael Brown',
    age: 46,
    gender: 'Male',
    bloodGroup: 'B-',
    department: 'Orthopedics',
    assignedDoctor: 'Dr. James Wilson',
    status: 'In Surgery',
    room: 'OR Suite 3',
    phone: '+1 (555) 456-7890',
    email: 'm.brown@example.com',
    lastVisit: 'Today, 07:15 AM',
    admissionDate: 'May 12, 2026',
    vitals: {
      bloodPressure: '132/85 mmHg',
      heartRate: '80 bpm',
      temperature: '98.8 °F',
      oxygenLevel: '97%'
    },
    medicalHistory: [
      'Right knee ACL tear during sports activity',
      'Penicillin allergy (hives/rash)'
    ],
    prescriptions: [
      { medicine: 'Cefazolin', dosage: '1g IV', frequency: 'Pre-operative prophylaxis' },
      { medicine: 'Oxycodone/APAP', dosage: '5/325mg', frequency: 'Post-op as needed' }
    ],
    billingSummary: { total: 12400, pending: 1800, insurance: 'United Healthcare Choice' },
    clinicalNotes: 'Undergoing arthroscopic ACL reconstruction. Estimated recovery duration: 6 weeks physiotherapy.'
  },
  {
    id: 'pat-4',
    patientId: 'PT-8945',
    name: 'Olivia Wilson',
    age: 7,
    gender: 'Female',
    bloodGroup: 'O+',
    department: 'Pediatrics',
    assignedDoctor: 'Dr. Elena Rostova',
    status: 'Outpatient',
    phone: '+1 (555) 567-8901',
    email: 'parent.wilson@example.com',
    lastVisit: 'Today, 10:30 AM',
    vitals: {
      bloodPressure: '100/64 mmHg',
      heartRate: '92 bpm',
      temperature: '99.1 °F',
      oxygenLevel: '99%'
    },
    medicalHistory: [
      'Mild childhood asthma',
      'Up to date on pediatric immunization schedule'
    ],
    prescriptions: [
      { medicine: 'Albuterol Inhaler', dosage: '90mcg', frequency: '2 puffs prior to physical exertion' }
    ],
    billingSummary: { total: 450, pending: 0, insurance: 'Cigna Global Health' },
    clinicalNotes: 'Annual developmental wellness screening. Lungs clear, growth percentile 65th.'
  },
  {
    id: 'pat-5',
    patientId: 'PT-8946',
    name: 'David Martinez',
    age: 62,
    gender: 'Male',
    bloodGroup: 'AB+',
    department: 'General Medicine',
    assignedDoctor: 'Dr. Sarah Chen',
    status: 'Admitted',
    room: 'Ward 2A - Bed 04',
    phone: '+1 (555) 678-9012',
    email: 'david.m@example.com',
    lastVisit: 'Today, 11:00 AM',
    admissionDate: 'May 11, 2026',
    vitals: {
      bloodPressure: '136/88 mmHg',
      heartRate: '78 bpm',
      temperature: '100.4 °F',
      oxygenLevel: '96%'
    },
    medicalHistory: [
      'Type 2 Diabetes Mellitus',
      'Community-acquired lobar pneumonia'
    ],
    prescriptions: [
      { medicine: 'Ceftriaxone', dosage: '1g IV', frequency: 'Every 24 hours' },
      { medicine: 'Metformin', dosage: '500mg', frequency: 'Twice daily with meals' }
    ],
    billingSummary: { total: 3200, pending: 450, insurance: 'Medicare Advantage' },
    clinicalNotes: 'Responding favorably to antibiotic therapy. Sputum cultures negative for MRSA.'
  },
  {
    id: 'pat-6',
    patientId: 'PT-8947',
    name: 'Sophia Patel',
    age: 29,
    gender: 'Female',
    bloodGroup: 'A-',
    department: 'Emergency',
    assignedDoctor: 'Dr. Marcus Vance',
    status: 'Admitted',
    room: 'ER Bay 06',
    phone: '+1 (555) 789-0123',
    email: 'sophia.p@example.com',
    lastVisit: 'Today, 11:45 AM',
    admissionDate: 'May 12, 2026',
    vitals: {
      bloodPressure: '110/70 mmHg',
      heartRate: '86 bpm',
      temperature: '98.6 °F',
      oxygenLevel: '99%'
    },
    medicalHistory: [
      'Acute acute appendicitis suspected',
      'No previous surgical history'
    ],
    prescriptions: [
      { medicine: 'Normal Saline IV', dosage: '1000mL', frequency: '125 mL/hr' }
    ],
    billingSummary: { total: 2100, pending: 300, insurance: 'Kaiser Foundation' },
    clinicalNotes: 'Abdominal CT scan ordered with IV contrast. Surgical consult paged.'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    time: '09:00 AM',
    date: 'Today',
    patientName: 'Robert Johnson',
    patientId: 'PT-8942',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Chen',
    type: 'Consultation',
    status: 'Confirmed',
    room: 'Suite 401',
    notes: 'Post-stent 30-day electrocardiogram review.'
  },
  {
    id: 'apt-2',
    time: '09:30 AM',
    date: 'Today',
    patientName: 'Emma Davis',
    patientId: 'PT-8943',
    department: 'Neurology',
    doctor: 'Dr. Michael Chang',
    type: 'Follow-up',
    status: 'Confirmed',
    room: 'Suite 310',
    notes: 'Evaluate response to topiramate migraine prophylaxis.'
  },
  {
    id: 'apt-3',
    time: '10:00 AM',
    date: 'Today',
    patientName: 'Michael Brown',
    patientId: 'PT-8944',
    department: 'Orthopedics',
    doctor: 'Dr. James Wilson',
    type: 'Surgical Review',
    status: 'Pending',
    room: 'OR Prep 2',
    notes: 'Pre-op physical assessment and consent confirmation.'
  },
  {
    id: 'apt-4',
    time: '10:30 AM',
    date: 'Today',
    patientName: 'Olivia Wilson',
    patientId: 'PT-8945',
    department: 'Pediatrics',
    doctor: 'Dr. Elena Rostova',
    type: 'Checkup',
    status: 'Confirmed',
    room: 'Suite 204',
    notes: 'Pediatric wellness exam and spirometry evaluation.'
  },
  {
    id: 'apt-5',
    time: '11:00 AM',
    date: 'Today',
    patientName: 'David Martinez',
    patientId: 'PT-8946',
    department: 'General Medicine',
    doctor: 'Dr. Sarah Chen',
    type: 'Consultation',
    status: 'Pending',
    room: 'Suite 102',
    notes: 'Follow-up on HbA1c lab panels and glycemic control.'
  },
  {
    id: 'apt-6',
    time: '01:30 PM',
    date: 'Today',
    patientName: 'Lucas Wright',
    patientId: 'PT-8948',
    department: 'Radiology',
    doctor: 'Dr. Claire Laurent',
    type: 'Diagnostic',
    status: 'Confirmed',
    room: 'MRI Wing 1',
    notes: 'Lumbar spine contrast MRI for chronic radiculopathy.'
  },
  {
    id: 'apt-7',
    time: '02:15 PM',
    date: 'Today',
    patientName: 'Hannah Kim',
    patientId: 'PT-8949',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Chen',
    type: 'Follow-up',
    status: 'Confirmed',
    room: 'Suite 402',
    notes: 'Holter monitor 48-hour data extraction and analysis.'
  }
];

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 'dept-1',
    name: 'Emergency Medicine',
    code: 'EM-01',
    headDoctor: 'Dr. Marcus Vance',
    occupancyPercent: 90,
    totalBeds: 20,
    occupiedBeds: 18,
    waitTimeMinutes: 18,
    staffOnDuty: 24,
    activeAlerts: 2,
    description: '24/7 Level 1 Trauma care, rapid triage, resuscitation, and acute stabilization.',
    category: 'Critical Care'
  },
  {
    id: 'dept-2',
    name: 'Cardiology & Vascular',
    code: 'CARD-02',
    headDoctor: 'Dr. Sarah Chen',
    occupancyPercent: 82,
    totalBeds: 30,
    occupiedBeds: 25,
    waitTimeMinutes: 12,
    staffOnDuty: 18,
    activeAlerts: 0,
    description: 'Comprehensive cardiovascular diagnostics, catheterization lab, and cardiac telemetry.',
    category: 'Specialty'
  },
  {
    id: 'dept-3',
    name: 'Intensive Care Unit (ICU)',
    code: 'ICU-03',
    headDoctor: 'Dr. Arthur Sterling',
    occupancyPercent: 80,
    totalBeds: 30,
    occupiedBeds: 24,
    waitTimeMinutes: 5,
    staffOnDuty: 32,
    activeAlerts: 1,
    description: 'Multi-organ life support, continuous invasive monitoring, and critical ventilation.',
    category: 'Critical Care'
  },
  {
    id: 'dept-4',
    name: 'Neurology & Neurosurgery',
    code: 'NEUR-04',
    headDoctor: 'Dr. Michael Chang',
    occupancyPercent: 68,
    totalBeds: 25,
    occupiedBeds: 17,
    waitTimeMinutes: 20,
    staffOnDuty: 14,
    activeAlerts: 0,
    description: 'Stroke triage, electroencephalography, neuro-interventional surgery, and spine care.',
    category: 'Specialty'
  },
  {
    id: 'dept-5',
    name: 'Orthopedics & Sports',
    code: 'ORTH-05',
    headDoctor: 'Dr. James Wilson',
    occupancyPercent: 75,
    totalBeds: 28,
    occupiedBeds: 21,
    waitTimeMinutes: 15,
    staffOnDuty: 16,
    activeAlerts: 0,
    description: 'Joint replacement, arthroscopic surgery, fracture management, and physical rehabilitation.',
    category: 'Specialty'
  },
  {
    id: 'dept-6',
    name: 'Pediatrics & Neonatal',
    code: 'PED-06',
    headDoctor: 'Dr. Elena Rostova',
    occupancyPercent: 62,
    totalBeds: 26,
    occupiedBeds: 16,
    waitTimeMinutes: 10,
    staffOnDuty: 15,
    activeAlerts: 0,
    description: 'Specialized pediatric medicine, NICU incubators, and adolescent developmental clinics.',
    category: 'Specialty'
  },
  {
    id: 'dept-7',
    name: 'General Internal Medicine',
    code: 'GEN-07',
    headDoctor: 'Dr. Valerie Thorne',
    occupancyPercent: 78,
    totalBeds: 50,
    occupiedBeds: 39,
    waitTimeMinutes: 25,
    staffOnDuty: 22,
    activeAlerts: 1,
    description: 'Comprehensive chronic disease management, inpatient post-acute care, and general diagnostics.',
    category: 'General'
  },
  {
    id: 'dept-8',
    name: 'Diagnostic Radiology',
    code: 'RAD-08',
    headDoctor: 'Dr. Claire Laurent',
    occupancyPercent: 88,
    totalBeds: 12,
    occupiedBeds: 10,
    waitTimeMinutes: 8,
    staffOnDuty: 19,
    activeAlerts: 0,
    description: '3T MRI, 128-slice CT scanning, ultrasound, digital fluoroscopy, and interventional biopsy.',
    category: 'Diagnostic'
  }
];

export const INITIAL_WARDS: WardCapacity[] = [
  {
    id: 'ward-1',
    wardName: 'Intensive Care Unit (ICU)',
    category: 'ICU',
    occupied: 24,
    total: 30,
    available: 6,
    reserved: 2,
    percentage: 80,
    status: 'Near Capacity',
    nurseInCharge: 'Nurse Supervisor Grace Lee, RN'
  },
  {
    id: 'ward-2',
    wardName: 'General Inpatient Ward',
    category: 'General',
    occupied: 45,
    total: 60,
    available: 15,
    reserved: 4,
    percentage: 75,
    status: 'Optimal',
    nurseInCharge: 'Nurse Lead Thomas Rivera, BSN'
  },
  {
    id: 'ward-3',
    wardName: 'Emergency Stabilization Bay',
    category: 'Emergency',
    occupied: 18,
    total: 20,
    available: 2,
    reserved: 1,
    percentage: 90,
    status: 'Critical',
    nurseInCharge: 'Charge Nurse Amanda Scott, CEN'
  },
  {
    id: 'ward-4',
    wardName: 'Private Executive Suites',
    category: 'Private',
    occupied: 12,
    total: 15,
    available: 3,
    reserved: 1,
    percentage: 80,
    status: 'Optimal',
    nurseInCharge: 'Hospitality RN Clara Jensen'
  },
  {
    id: 'ward-5',
    wardName: 'Maternity & Neonatal Ward',
    category: 'Maternity',
    occupied: 14,
    total: 20,
    available: 6,
    reserved: 2,
    percentage: 70,
    status: 'Optimal',
    nurseInCharge: 'Midwife Lead Rachel Adams, CNM'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2026-0491',
    patientName: 'Robert Johnson',
    patientId: 'PT-8942',
    department: 'Cardiology',
    amount: 4850,
    date: 'May 10, 2026',
    dueDate: 'Jun 10, 2026',
    status: 'Pending',
    insuranceProvider: 'BlueCross Health',
    services: [
      { name: 'Diagnostic Coronary Angiogram', cost: 3200 },
      { name: 'Cardiac Telemetry 48hr Monitoring', cost: 1100 },
      { name: 'Physician Consultation Fee', cost: 550 }
    ]
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2026-0490',
    patientName: 'Michael Brown',
    patientId: 'PT-8944',
    department: 'Orthopedics',
    amount: 12400,
    date: 'May 12, 2026',
    dueDate: 'Jun 12, 2026',
    status: 'Insurance Claim',
    insuranceProvider: 'United Healthcare',
    services: [
      { name: 'Arthroscopic Knee Reconstruction', cost: 8900 },
      { name: 'General Anesthesiology Service', cost: 2100 },
      { name: 'Surgical Implant Hardware', cost: 1400 }
    ]
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2026-0489',
    patientName: 'Emma Davis',
    patientId: 'PT-8943',
    department: 'Neurology',
    amount: 1200,
    date: 'May 12, 2026',
    dueDate: 'May 12, 2026',
    status: 'Paid',
    insuranceProvider: 'Aetna Premier',
    services: [
      { name: 'Brain MRI Protocol with Contrast', cost: 950 },
      { name: 'Neurologist Specialist Consultation', cost: 250 }
    ]
  },
  {
    id: 'inv-4',
    invoiceNumber: 'INV-2026-0488',
    patientName: 'Olivia Wilson',
    patientId: 'PT-8945',
    department: 'Pediatrics',
    amount: 450,
    date: 'May 12, 2026',
    dueDate: 'May 12, 2026',
    status: 'Paid',
    insuranceProvider: 'Cigna Global',
    services: [
      { name: 'Comprehensive Pediatric Wellness Exam', cost: 300 },
      { name: 'Pulmonary Spirometry Screening', cost: 150 }
    ]
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'st-1',
    name: 'Dr. Sarah Chen, MD',
    role: 'Chief Medical Officer & Cardiologist',
    department: 'Cardiology',
    specialty: 'Interventional Cardiology',
    status: 'On Duty',
    email: 'sarah.chen@citycare.hospital',
    phone: '+1 (555) 101-2001',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    room: 'Suite 401',
    patientsAssigned: 14
  },
  {
    id: 'st-2',
    name: 'Dr. Marcus Vance, MD',
    role: 'ER Clinical Director',
    department: 'Emergency Medicine',
    specialty: 'Trauma & Critical Resuscitation',
    status: 'On Duty',
    email: 'marcus.vance@citycare.hospital',
    phone: '+1 (555) 101-2002',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    room: 'ER Triage Lead',
    patientsAssigned: 22
  },
  {
    id: 'st-3',
    name: 'Dr. Michael Chang, MD',
    role: 'Lead Neurologist',
    department: 'Neurology',
    specialty: 'Cerebrovascular & Neuro-Oncology',
    status: 'On Duty',
    email: 'michael.chang@citycare.hospital',
    phone: '+1 (555) 101-2003',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    room: 'Suite 310',
    patientsAssigned: 11
  },
  {
    id: 'st-4',
    name: 'Dr. James Wilson, MD',
    role: 'Chief Orthopedic Surgeon',
    department: 'Orthopedics',
    specialty: 'Joint Arthroplasty & Sports Trauma',
    status: 'In Surgery',
    email: 'james.wilson@citycare.hospital',
    phone: '+1 (555) 101-2004',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    room: 'OR Wing B',
    patientsAssigned: 9
  },
  {
    id: 'st-5',
    name: 'Dr. Elena Rostova, MD',
    role: 'Pediatric Specialist',
    department: 'Pediatrics',
    specialty: 'Neonatal Care & Adolescent Health',
    status: 'On Duty',
    email: 'elena.rostova@citycare.hospital',
    phone: '+1 (555) 101-2005',
    avatar: 'https://images.unsplash.com/photo-1594824813591-381c37b3f9bb?w=150&auto=format&fit=crop&q=80',
    room: 'Suite 204',
    patientsAssigned: 12
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-item-1',
    name: 'Atorvastatin 20mg Tablets',
    category: 'Pharmaceuticals',
    stockLevel: 1450,
    minThreshold: 300,
    unit: 'Tablets',
    status: 'In Stock',
    location: 'Central Pharmacy - Shelf C12',
    lastRestocked: 'May 08, 2026'
  },
  {
    id: 'inv-item-2',
    name: 'Sterile Surgical Gloves (Size 7.5)',
    category: 'PPE & Consumables',
    stockLevel: 180,
    minThreshold: 200,
    unit: 'Pairs',
    status: 'Low Stock',
    location: 'OR Supply Room 2',
    lastRestocked: 'Apr 28, 2026'
  },
  {
    id: 'inv-item-3',
    name: 'Ceftriaxone 1g Injectable Vials',
    category: 'Pharmaceuticals',
    stockLevel: 420,
    minThreshold: 100,
    unit: 'Vials',
    status: 'In Stock',
    location: 'Emergency Pharmacy Stock',
    lastRestocked: 'May 04, 2026'
  },
  {
    id: 'inv-item-4',
    name: 'MRI IV Contrast Agents (Omniscan 20mL)',
    category: 'Diagnostics',
    stockLevel: 45,
    minThreshold: 60,
    unit: 'Units',
    status: 'Critical',
    location: 'Radiology Prep Cabinet',
    lastRestocked: 'Apr 15, 2026'
  }
];

export const INITIAL_AI_INSIGHTS: AiInsight[] = [
  {
    id: 'ai-1',
    title: 'Predicted ER Patient Influx',
    description: 'Historical weekend weather correlation predicts a 35% surge in respiratory and trauma admissions tomorrow afternoon.',
    category: 'Capacity',
    severity: 'warning',
    metricHighlight: '+35% ER Demand',
    suggestedAction: 'Pre-allocate 4 swing beds in Ward 2A and page on-call respiratory therapists.',
    timestamp: '15 mins ago'
  },
  {
    id: 'ai-2',
    title: 'ICU Capacity Warning (80% Occupied)',
    description: '24 of 30 ICU beds are active. 2 scheduled post-op cardiac transfers expected by 3:00 PM.',
    category: 'Capacity',
    severity: 'urgent',
    metricHighlight: '80% Occupancy',
    suggestedAction: 'Review potential step-down criteria for Patients PT-8821 and PT-8840 to General Telemetry.',
    timestamp: '42 mins ago'
  },
  {
    id: 'ai-3',
    title: 'Unconfirmed Schedule Bottleneck',
    description: '3 high-priority afternoon surgery consultations require confirmation to prevent OR idle time.',
    category: 'Schedule',
    severity: 'info',
    metricHighlight: '3 Pending Slots',
    suggestedAction: 'Trigger automated SMS confirmation workflow to patient contact list.',
    timestamp: '2 hours ago'
  }
];

export const RESOURCES_ARTICLES: ResourceArticle[] = [
  {
    slug: 'reducing-administrative-friction-in-hospitals',
    title: 'Reducing Administrative Friction in Modern Hospitals',
    excerpt: 'How connected clinical operating systems eliminate duplicate data entry, reduce physician burnout, and protect care delivery time.',
    category: 'Clinical Operations',
    readTime: '6 min read',
    date: 'Aug 24, 2026',
    author: {
      name: 'Dr. Sarah Chen, MD',
      role: 'Chief Medical Officer',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'
    },
    keyTakeaways: [
      'Clinicians spend an average of 42% of their day interacting with disparate documentation software.',
      'Unifying scheduling, bedside vitals, and billing into one graph reduces EHR cognitive fatigue.',
      'Calm UI interfaces with warm contrast reduce operational medical charting errors by up to 28%.'
    ],
    content: [
      'In modern healthcare administration, hospital staff are constantly forced to bridge disconnected software systems. A patient’s arrival is tracked in one terminal, their lab orders in another, bed capacity in a whiteboard ledger, and billing in an archaic legacy mainframe.',
      'This fragmentation creates administrative drag that directly impacts patient outcomes. When information is scattered, nurses spend valuable hours verifying medication histories rather than sitting with patients.',
      'At Kairo, our thesis is that a hospital should function as an interconnected organism. When a bed is vacated, housekeeping is automatically dispatched, the admitting physician is notified, and billing reconciles the stay in real time.'
    ]
  },
  {
    slug: 'designing-better-patient-scheduling',
    title: 'Designing Better Patient Scheduling: Reducing No-Shows & ER Wait Times',
    excerpt: 'Why static time-slot booking fails in acute care environments and how predictive scheduling smooths clinical workloads.',
    category: 'Operational Strategy',
    readTime: '5 min read',
    date: 'Aug 18, 2026',
    author: {
      name: 'Dr. Marcus Vance, MD',
      role: 'ER Clinical Director',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
    },
    keyTakeaways: [
      'Predictive appointment buffers reduce patient wait times from 45 minutes to under 18 minutes.',
      'Automated multi-channel confirmation workflows cut outpatient no-show rates by over 60%.',
      'Dynamic staff reallocation based on real-time triage scoring prevents emergency room saturation.'
    ],
    content: [
      'Hospital scheduling is rarely predictable. A cardiology consultation scheduled for 20 minutes might uncover a critical arrhythmia requiring immediate catheterization, throwing an entire afternoon clinic into gridlock.',
      'Traditional scheduling tools treat doctors like static calendar appointments. Kairo Hospital OS implements dynamic capacity smoothing, calculating average procedure durations and dynamically reserving recovery buffers.',
      'By connecting outpatient appointments with real-time ER triage data, department heads can proactively adjust staffing before waiting rooms reach capacity.'
    ]
  },
  {
    slug: 'using-operational-data-to-improve-hospital-efficiency',
    title: 'Using Operational Intelligence to Maximize Bed Turnover & ICU Capacity',
    excerpt: 'How machine-learning assisted triage algorithms anticipate ward bottlenecks without replacing clinical judgment.',
    category: 'Hospital Analytics',
    readTime: '7 min read',
    date: 'Aug 10, 2026',
    author: {
      name: 'Dr. Arthur Sterling, MD',
      role: 'ICU Critical Care Director',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80'
    },
    keyTakeaways: [
      'ICU bed bottlenecks often stem from delayed step-down discharge approvals rather than true bed shortages.',
      'Automated step-down criteria checklists accelerate post-acute transfers by an average of 4.2 hours.',
      'Continuous telemetry integration provides earlier warnings for deteriorating patients on general wards.'
    ],
    content: [
      'Managing ICU capacity is one of the most stressful responsibilities in hospital management. Turning away an emergency trauma transfer because critical care beds are 100% occupied is an outcome every administrator strives to avoid.',
      'Frequently, beds remain occupied not because patients still require invasive ventilation, but because the multidisciplinary transfer sign-offs have stalled in communication queues.',
      'Kairo provides real-time visibility into discharge readiness criteria across all wards, alerting charge nurses the moment a patient meets hemodynamic stability thresholds for step-down transfer.'
    ]
  },
  {
    slug: 'modernizing-hospital-workflows',
    title: 'Modernizing Hospital Workflows: The Philosophy of Calm Healthcare Software',
    excerpt: 'Why high-stakes healthcare technology demands visual clarity, tactile responsiveness, and zero unnecessary visual noise.',
    category: 'Healthcare Design',
    readTime: '5 min read',
    date: 'Jul 28, 2026',
    author: {
      name: 'Dr. Elena Rostova, MD',
      role: 'Pediatric Specialist',
      avatar: 'https://images.unsplash.com/photo-1594824813591-381c37b3f9bb?w=150&auto=format&fit=crop&q=80'
    },
    keyTakeaways: [
      'Aggressive alarm fatigue and harsh visual styling directly contribute to cognitive errors in clinical teams.',
      'Warm, ergonomic color systems and clear typographical hierarchy improve scanning speed during crises.',
      'Healthcare software should inspire confidence, precision, and tranquility.'
    ],
    content: [
      'Hospital environments are already sensory-intense places filled with monitor chimes, emergency alerts, and rapid physical movement. Software should not add to that sensory bombardment.',
      'When medical software relies on harsh contrasts, blinding white screens, or cluttered dashboards with 80 unorganized icons, cognitive bandwidth is drained.',
      'Kairo is deliberately engineered with soft, warm peach and cream tones, restrained terracotta indicators, and editorial typography that honors the gravity and focus of healthcare professionals.'
    ]
  }
];
