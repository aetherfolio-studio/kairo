'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  X,
  Plus,
  UserPlus,
  Calendar,
  Building2,
  Clock,
  CheckCircle2,
  Activity,
  Heart,
  FileText,
  Receipt,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

/* ====================================================
   1. BOOK A DEMO MODAL
   ==================================================== */
export function BookDemoModal() {
  const { isBookDemoOpen, setIsBookDemoOpen } = useHospitalStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    bedsCount: '100-300 Beds',
    department: 'General Hospital',
    date: '2026-05-18'
  });

  if (!isBookDemoOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsBookDemoOpen(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C1810]/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FFFDFC] border border-[#EFE5DC] rounded-3xl p-6 sm:p-8 shadow-warm-lg flex flex-col gap-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#EFE5DC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2C1810]">Book a Hospital OS Demo</h3>
              <p className="text-[11px] text-[#7A6258]">Personalized walkthrough with a Healthcare Solutions Architect</p>
            </div>
          </div>
          <button
            onClick={() => setIsBookDemoOpen(false)}
            className="p-1.5 text-[#7A6258] hover:text-[#2C1810] rounded-lg cursor-pointer active:scale-95 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-[#E8F8F0] border border-[#A7F3D0] text-center flex flex-col items-center gap-3 animate-in zoom-in-95">
            <CheckCircle2 className="w-12 h-12 text-[#065F46] animate-heartbeat" />
            <h4 className="text-base font-bold text-[#065F46]">Demo Request Scheduled</h4>
            <p className="text-xs text-[#065F46]/80 max-w-xs">
              We have reserved a 30-minute interactive session for <strong>{formData.organization || 'your hospital'}</strong>. A calendar invite has been dispatched.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#2C1810]">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Sarah Chen"
                  className="bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none focus:border-[#E06D53] shadow-warm-sm transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#2C1810]">Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@citycare.hospital"
                  className="bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none focus:border-[#E06D53] shadow-warm-sm transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#2C1810]">Healthcare Facility</label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="CityCare Memorial Hospital"
                  className="bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none focus:border-[#E06D53] shadow-warm-sm transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#2C1810]">Facility Size</label>
                <select
                  value={formData.bedsCount}
                  onChange={(e) => setFormData({ ...formData, bedsCount: e.target.value })}
                  className="bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none focus:border-[#E06D53] shadow-warm-sm"
                >
                  <option>Under 50 Beds (Clinic)</option>
                  <option>50-150 Beds (Community)</option>
                  <option>150-500 Beds (Regional)</option>
                  <option>500+ Beds (Multi-Campus Network)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#EFE5DC]">
              <span className="text-[11px] text-[#A59288] font-mono">Demo Concept Simulation</span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold rounded-xl transition-all shadow-terracotta cursor-pointer active:scale-95"
              >
                Confirm Walkthrough
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ====================================================
   2. PATIENT RECORD DETAIL DRAWER
   ==================================================== */
export function PatientRecordDrawer() {
  const { selectedPatient, setSelectedPatient, updatePatientStatus } = useHospitalStore();

  if (!selectedPatient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#2C1810]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-full bg-[#FFFDFC] border-l border-[#EFE5DC] p-6 sm:p-8 shadow-warm-lg flex flex-col justify-between gap-6 overflow-y-auto animate-in slide-in-from-right duration-300 ease-out">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-[#EFE5DC]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA] flex items-center justify-center text-[#E06D53] font-bold text-lg font-mono animate-heartbeat">
                {selectedPatient.bloodGroup}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-[#2C1810]">{selectedPatient.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#FAF6F2] text-[#7A6258] border border-[#EFE5DC]">
                    {selectedPatient.patientId}
                  </span>
                </div>
                <span className="text-xs text-[#7A6258]">
                  {selectedPatient.age} yrs • {selectedPatient.gender} • {selectedPatient.department}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPatient(null)}
              className="p-2 text-[#7A6258] hover:text-[#2C1810] rounded-xl cursor-pointer active:scale-95 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Clinical Status & Bed */}
          <div className="p-4 rounded-2xl bg-[#FAF6F2] border border-[#EFE5DC] flex items-center justify-between shadow-warm-sm">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#E06D53] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#2C1810]">
                  Status: {selectedPatient.status}
                </span>
                <span className="text-[11px] text-[#7A6258] font-mono">
                  {selectedPatient.room || 'Outpatient Clinic Consultation'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() =>
                  updatePatientStatus(
                    selectedPatient.id,
                    selectedPatient.status === 'Admitted' ? 'Discharged' : 'Admitted'
                  )
                }
                className="px-3.5 py-1.5 bg-white hover:bg-[#F6EFE9] text-[#2C1810] border border-[#EFE5DC] rounded-xl text-xs font-semibold transition-all shadow-warm-sm active:scale-95 cursor-pointer"
              >
                Toggle Status
              </button>
            </div>
          </div>

          {/* Real-time Vitals Grid */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A59288] font-bold">
              Recorded Clinical Vitals
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-white border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col transition-all">
                <span className="text-[10px] text-[#7A6258]">Blood Pressure</span>
                <span className="text-xs font-bold text-[#2C1810] font-mono mt-0.5">
                  {selectedPatient.vitals.bloodPressure}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col transition-all">
                <span className="text-[10px] text-[#7A6258]">Heart Rate</span>
                <span className="text-xs font-bold text-[#2C1810] font-mono mt-0.5 text-[#E06D53]">
                  {selectedPatient.vitals.heartRate}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col transition-all">
                <span className="text-[10px] text-[#7A6258]">Temperature</span>
                <span className="text-xs font-bold text-[#2C1810] font-mono mt-0.5">
                  {selectedPatient.vitals.temperature}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#EFE5DC] shadow-warm-sm hover-lift flex flex-col transition-all">
                <span className="text-[10px] text-[#7A6258]">Oxygen SpO2</span>
                <span className="text-xs font-bold text-emerald-600 font-mono mt-0.5">
                  {selectedPatient.vitals.oxygenLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A59288] font-bold">
              Medical History & Allergies
            </span>
            <div className="flex flex-col gap-1.5">
              {selectedPatient.medicalHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EFE5DC] text-xs text-[#2C1810] shadow-warm-sm hover:border-[#E06D53]/40 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Prescriptions */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A59288] font-bold">
              Active Prescriptions
            </span>
            <div className="flex flex-col gap-1.5">
              {selectedPatient.prescriptions.map((rx, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF6F2] border border-[#EFE5DC] text-xs hover:border-[#E06D53]/40 transition-colors"
                >
                  <span className="font-bold text-[#2C1810]">{rx.medicine} ({rx.dosage})</span>
                  <span className="text-[#7A6258] font-mono text-[11px]">{rx.frequency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Notes */}
          <div className="flex flex-col gap-1.5 p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm">
            <span className="text-xs font-bold text-[#2C1810] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#E06D53]" />
              <span>Assigned Physician Notes ({selectedPatient.assignedDoctor})</span>
            </span>
            <p className="text-xs text-[#7A6258] leading-relaxed italic">
              &quot;{selectedPatient.clinicalNotes}&quot;
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#EFE5DC] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#A59288] font-mono">Billing Ledger</span>
            <span className="text-xs font-bold text-[#2C1810]">
              ${selectedPatient.billingSummary.total.toLocaleString()} Total • {selectedPatient.billingSummary.insurance}
            </span>
          </div>

          <button
            onClick={() => setSelectedPatient(null)}
            className="px-5 py-2 bg-[#2C1810] hover:bg-[#3D231A] text-white text-xs font-semibold rounded-xl transition-all shadow-warm-sm active:scale-95 cursor-pointer"
          >
            Close Record
          </button>
        </div>
      </div>
    </div>
  );
}

/* ====================================================
   3. NEW PATIENT ADMISSION MODAL
   ==================================================== */
export function NewPatientModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addPatient } = useHospitalStore();
  const [formData, setFormData] = useState({
    name: '',
    age: 45,
    gender: 'Female' as const,
    bloodGroup: 'O+',
    department: 'Cardiology',
    assignedDoctor: 'Dr. Sarah Chen',
    phone: '+1 (555) 000-1122',
    email: 'patient@example.com',
    room: 'Ward 3A - Bed 02',
    notes: 'Initial admission intake evaluation.'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addPatient({
      name: formData.name.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      department: formData.department,
      assignedDoctor: formData.assignedDoctor,
      status: 'Admitted',
      room: formData.room,
      phone: formData.phone,
      email: formData.email,
      lastVisit: 'Just now',
      admissionDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      vitals: {
        bloodPressure: '120/80 mmHg',
        heartRate: '72 bpm',
        temperature: '98.6 °F',
        oxygenLevel: '98%'
      },
      medicalHistory: ['No known severe allergies', 'Admitted for clinical monitoring'],
      prescriptions: [{ medicine: 'Saline IV Hydration', dosage: '1000mL', frequency: 'Continuous' }],
      billingSummary: { total: 1850, pending: 250, insurance: 'Standard Health Coverage' },
      clinicalNotes: formData.notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C1810]/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FFFDFC] border border-[#EFE5DC] rounded-3xl p-6 sm:p-8 shadow-warm-lg flex flex-col gap-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#EFE5DC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2C1810]">Admit New Patient</h3>
              <p className="text-[11px] text-[#7A6258]">Register clinical intake and allocate ward bed</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#7A6258] hover:text-[#2C1810] cursor-pointer active:scale-95 transition-transform">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2C1810]">Patient Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Jonathan Mercer"
                className="bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none focus:border-[#E06D53]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2C1810]">Age & Gender</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min={0}
                  max={120}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="bg-white border border-[#EFE5DC] rounded-xl px-3 py-2 text-xs text-[#2C1810] focus:outline-none"
                />
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="bg-white border border-[#EFE5DC] rounded-xl px-2 py-2 text-xs text-[#2C1810] focus:outline-none"
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2C1810]">Clinical Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="bg-white border border-[#EFE5DC] rounded-xl px-3 py-2 text-xs text-[#2C1810] focus:outline-none"
              >
                <option>Cardiology</option>
                <option>Emergency Medicine</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>General Internal Medicine</option>
                <option>ICU</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2C1810]">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="bg-white border border-[#EFE5DC] rounded-xl px-3 py-2 text-xs text-[#2C1810] focus:outline-none"
              >
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#2C1810]">Allocated Room / Bed</label>
            <input
              type="text"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              placeholder="e.g. Ward 2B - Bed 08"
              className="bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EFE5DC]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#7A6258] hover:text-[#2C1810] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold rounded-xl transition-all shadow-terracotta cursor-pointer active:scale-95"
            >
              Admit Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ====================================================
   4. NEW APPOINTMENT MODAL
   ==================================================== */
export function NewAppointmentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addAppointment, patients } = useHospitalStore();
  const [patientName, setPatientName] = useState(patients[0]?.name || 'Robert Johnson');
  const [time, setTime] = useState('02:30 PM');
  const [department, setDepartment] = useState('Cardiology');
  const [doctor, setDoctor] = useState('Dr. Sarah Chen');
  const [type, setType] = useState<'Consultation' | 'Follow-up' | 'Checkup' | 'Diagnostic'>('Consultation');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = patients.find((p) => p.name === patientName);

    addAppointment({
      time,
      date: 'Today',
      patientName,
      patientId: found?.patientId || 'PT-9000',
      department,
      doctor,
      type,
      status: 'Confirmed',
      room: 'Suite 401',
      notes: 'Scheduled via hospital reception desk.'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C1810]/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FFFDFC] border border-[#EFE5DC] rounded-3xl p-6 sm:p-8 shadow-warm-lg flex flex-col gap-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#EFE5DC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FDEEE9] flex items-center justify-center text-[#E06D53]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2C1810]">Schedule Appointment</h3>
              <p className="text-[11px] text-[#7A6258]">Add clinical consultation to physician schedule</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#7A6258] hover:text-[#2C1810] cursor-pointer active:scale-95 transition-transform">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#2C1810]">Select Patient</label>
            <select
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} ({p.patientId}) - {p.department}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2C1810]">Time Slot</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none"
              >
                <option>09:00 AM</option>
                <option>10:30 AM</option>
                <option>11:15 AM</option>
                <option>01:30 PM</option>
                <option>02:30 PM</option>
                <option>03:45 PM</option>
                <option>04:30 PM</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2C1810]">Visit Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none"
              >
                <option>Consultation</option>
                <option>Follow-up</option>
                <option>Checkup</option>
                <option>Diagnostic</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2C1810]">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none"
              >
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
                <option>Pediatrics</option>
                <option>General Medicine</option>
                <option>Radiology</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2C1810]">Physician</label>
              <select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="bg-white border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none"
              >
                <option>Dr. Sarah Chen, MD</option>
                <option>Dr. Marcus Vance, MD</option>
                <option>Dr. Michael Chang, MD</option>
                <option>Dr. James Wilson, MD</option>
                <option>Dr. Elena Rostova, MD</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EFE5DC]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#7A6258] hover:text-[#2C1810] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold rounded-xl transition-all shadow-terracotta cursor-pointer active:scale-95"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
