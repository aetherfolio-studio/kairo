'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Patient,
  Appointment,
  Department,
  Ward,
  Invoice,
  StaffMember,
  InventoryItem,
  AIInsight,
  INITIAL_PATIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_DEPARTMENTS,
  INITIAL_WARDS,
  INITIAL_INVOICES,
  INITIAL_STAFF,
  INITIAL_INVENTORY,
  INITIAL_AI_INSIGHTS
} from './hospitalData';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
}

interface HospitalContextType {
  // Datasets
  patients: Patient[];
  appointments: Appointment[];
  departments: Department[];
  wards: Ward[];
  invoices: Invoice[];
  staff: StaffMember[];
  inventory: InventoryItem[];
  aiInsights: AIInsight[];

  // Modal & Drawer State
  isBookDemoOpen: boolean;
  setIsBookDemoOpen: (open: boolean) => void;
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  isNewPatientOpen: boolean;
  setIsNewPatientOpen: (open: boolean) => void;
  isNewAppointmentOpen: boolean;
  setIsNewAppointmentOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;

  // Actions
  updatePatientStatus: (patientId: string, newStatus: Patient['status']) => void;
  updateAppointmentStatus: (appointmentId: string, newStatus: Appointment['status']) => void;
  updateWardOccupancy: (wardId: string, delta: number) => void;
  sanitizeBed: (wardId: string) => void;
  updateInvoiceStatus: (invoiceId: string, newStatus: Invoice['status']) => void;
  updateStaffStatus: (staffId: string, newStatus: StaffMember['status']) => void;
  restockItem: (itemId: string, count: number) => void;
  addPatient: (patientData: Omit<Patient, 'id' | 'patientId'>) => void;
  addAppointment: (appointmentData: Omit<Appointment, 'id'>) => void;

  // Computed metrics
  totalRevenueToday: number;
  overallBedOccupancyPercent: number;
  activeAlertCount: number;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export function HospitalStoreProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [wards, setWards] = useState<Ward[]>(INITIAL_WARDS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);

  // Modals
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = ({ title, description, type = 'success' }: Omit<ToastMessage, 'id' | 'timestamp'>) => {
    const newToast: ToastMessage = {
      id: 'toast-' + Math.random().toString(36).substring(2, 9),
      title,
      description,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);

    setTimeout(() => {
      removeToast(newToast.id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsBookDemoOpen(false);
        setIsNewPatientOpen(false);
        setIsNewAppointmentOpen(false);
        setSelectedPatient(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updatePatientStatus = (patientId: string, newStatus: Patient['status']) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, status: newStatus } : p))
    );
    if (selectedPatient && selectedPatient.id === patientId) {
      setSelectedPatient((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    const found = patients.find((p) => p.id === patientId);
    addToast({
      title: `Patient Status Updated`,
      description: `${found?.name || 'Patient'} is now marked as "${newStatus}".`,
      type: newStatus === 'Admitted' ? 'info' : newStatus === 'Discharged' ? 'success' : 'warning'
    });
  };

  const updateAppointmentStatus = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointmentId ? { ...a, status: newStatus } : a))
    );
    const found = appointments.find((a) => a.id === appointmentId);
    addToast({
      title: `Appointment ${newStatus}`,
      description: `${found?.patientName || 'Consultation'} with ${found?.doctor} is now ${newStatus.toLowerCase()}.`,
      type: newStatus === 'Completed' ? 'success' : 'info'
    });
  };

  const updateWardOccupancy = (wardId: string, delta: number) => {
    setWards((prev) =>
      prev.map((w) => {
        if (w.id !== wardId) return w;
        const newOccupied = Math.max(0, Math.min(w.total, w.occupied + delta));
        const newPct = Math.round((newOccupied / w.total) * 100);
        const newStatus: Ward['status'] =
          newPct >= 90 ? 'Critical' : newPct >= 80 ? 'Near Capacity' : 'Normal';
        return {
          ...w,
          occupied: newOccupied,
          available: w.total - newOccupied - w.reserved,
          percentage: newPct,
          status: newStatus
        };
      })
    );
    const found = wards.find((w) => w.id === wardId);
    if (found) {
      addToast({
        title: delta > 0 ? `Bed Allocated in ${found.wardName}` : `Bed Discharged from ${found.wardName}`,
        description: `Occupancy adjusted to ${found.occupied + delta}/${found.total} beds.`,
        type: delta > 0 ? 'info' : 'success'
      });
    }
  };

  const sanitizeBed = (wardId: string) => {
    const found = wards.find((w) => w.id === wardId);
    addToast({
      title: `Sanitization Protocol Dispatched`,
      description: `Hospital sanitization team notified for ${found?.wardName || 'Ward'}. Bed will be available in ~15 mins.`,
      type: 'success'
    });
  };

  const updateInvoiceStatus = (invoiceId: string, newStatus: Invoice['status']) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: newStatus } : inv))
    );
    const found = invoices.find((inv) => inv.id === invoiceId);
    addToast({
      title: `Invoice ${found?.invoiceNumber} Updated`,
      description: `Payment status set to "${newStatus}".`,
      type: newStatus === 'Paid' ? 'success' : 'info'
    });
  };

  const updateStaffStatus = (staffId: string, newStatus: StaffMember['status']) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, status: newStatus } : s))
    );
    const found = staff.find((s) => s.id === staffId);
    addToast({
      title: `Staff Status Changed`,
      description: `${found?.name} is now "${newStatus}".`,
      type: 'info'
    });
  };

  const restockItem = (itemId: string, count: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const newLevel = item.stockLevel + count;
        return {
          ...item,
          stockLevel: newLevel,
          status: newLevel > item.minThreshold ? 'In Stock' : 'Low Stock'
        };
      })
    );
    const found = inventory.find((i) => i.id === itemId);
    addToast({
      title: `Restocked Supply`,
      description: `+${count} units added to ${found?.name}. Current level: ${
        (found?.stockLevel || 0) + count
      } ${found?.unit || 'units'}.`,
      type: 'success'
    });
  };

  const addPatient = (patientData: Omit<Patient, 'id' | 'patientId'>) => {
    const newId = `pt-${Date.now()}`;
    const nextNum = Math.floor(1000 + Math.random() * 9000);
    const newPatient: Patient = {
      ...patientData,
      id: newId,
      patientId: `PT-${nextNum}`
    };
    setPatients((prev) => [newPatient, ...prev]);
    addToast({
      title: `New Patient Admitted`,
      description: `${newPatient.name} assigned ID ${newPatient.patientId} in ${newPatient.department}.`,
      type: 'success'
    });
  };

  const addAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newApt: Appointment = {
      ...appointmentData,
      id: `apt-${Date.now()}`
    };
    setAppointments((prev) => [newApt, ...prev]);
    addToast({
      title: `Consultation Booked`,
      description: `Appointment for ${newApt.patientName} at ${newApt.time} confirmed.`,
      type: 'success'
    });
  };

  const totalRevenueToday = invoices.reduce((acc, curr) => acc + curr.amount, 0);

  const totalOccupiedBeds = wards.reduce((acc, curr) => acc + curr.occupied, 0);
  const totalFacilityBeds = wards.reduce((acc, curr) => acc + curr.total, 0);
  const overallBedOccupancyPercent = totalFacilityBeds > 0
    ? Math.round((totalOccupiedBeds / totalFacilityBeds) * 100)
    : 75;

  const activeAlertCount = departments.reduce((acc, curr) => acc + curr.activeAlerts, 0);

  return (
    <HospitalContext.Provider
      value={{
        patients,
        appointments,
        departments,
        wards,
        invoices,
        staff,
        inventory,
        aiInsights: INITIAL_AI_INSIGHTS,
        isBookDemoOpen,
        setIsBookDemoOpen,
        selectedPatient,
        setSelectedPatient,
        isNewPatientOpen,
        setIsNewPatientOpen,
        isNewAppointmentOpen,
        setIsNewAppointmentOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        toasts,
        addToast,
        removeToast,
        updatePatientStatus,
        updateAppointmentStatus,
        updateWardOccupancy,
        sanitizeBed,
        updateInvoiceStatus,
        updateStaffStatus,
        restockItem,
        addPatient,
        addAppointment,
        totalRevenueToday,
        overallBedOccupancyPercent,
        activeAlertCount
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospitalStore() {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospitalStore must be used within a HospitalStoreProvider');
  }
  return context;
}
