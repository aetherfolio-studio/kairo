'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Patient,
  Appointment,
  Department,
  WardCapacity,
  Invoice,
  StaffMember,
  InventoryItem,
  AiInsight,
  INITIAL_PATIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_DEPARTMENTS,
  INITIAL_WARDS,
  INITIAL_INVOICES,
  INITIAL_STAFF,
  INITIAL_INVENTORY,
  INITIAL_AI_INSIGHTS
} from './hospitalData';

interface HospitalStoreContextType {
  patients: Patient[];
  appointments: Appointment[];
  departments: Department[];
  wards: WardCapacity[];
  invoices: Invoice[];
  staff: StaffMember[];
  inventory: InventoryItem[];
  aiInsights: AiInsight[];
  
  // Selected Patient for Record Drawer
  selectedPatient: Patient | null;
  setSelectedPatient: (p: Patient | null) => void;

  // Modals & Navigation
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isBookDemoOpen: boolean;
  setIsBookDemoOpen: (open: boolean) => void;
  isNewPatientOpen: boolean;
  setIsNewPatientOpen: (open: boolean) => void;
  isNewAppointmentOpen: boolean;
  setIsNewAppointmentOpen: (open: boolean) => void;

  // Actions
  addPatient: (p: Omit<Patient, 'id' | 'patientId'>) => void;
  updatePatientStatus: (patientId: string, status: Patient['status']) => void;
  
  addAppointment: (a: Omit<Appointment, 'id'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  
  updateWardOccupancy: (wardId: string, delta: number) => void;
  updateInvoiceStatus: (invoiceId: string, status: Invoice['status']) => void;
  updateStaffStatus: (staffId: string, status: StaffMember['status']) => void;
  restockItem: (itemId: string, amount: number) => void;
  dismissInsight: (id: string) => void;

  // Computed Metrics
  totalPatientsCount: number;
  admittedPatientsCount: number;
  todayAppointmentsCount: number;
  totalRevenueToday: number;
  overallBedOccupancyPercent: number;
}

const HospitalStoreContext = createContext<HospitalStoreContextType | undefined>(undefined);

export function HospitalStoreProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [wards, setWards] = useState<WardCapacity[]>(INITIAL_WARDS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [aiInsights, setAiInsights] = useState<AiInsight[]>(INITIAL_AI_INSIGHTS);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);

  // Global Keyboard listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addPatient = (p: Omit<Patient, 'id' | 'patientId'>) => {
    const newId = `pat-${Date.now()}`;
    const newPtId = `PT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPatient: Patient = {
      ...p,
      id: newId,
      patientId: newPtId
    };
    setPatients((prev) => [newPatient, ...prev]);
  };

  const updatePatientStatus = (patientId: string, status: Patient['status']) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, status } : p))
    );
    if (selectedPatient && selectedPatient.id === patientId) {
      setSelectedPatient((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const addAppointment = (a: Omit<Appointment, 'id'>) => {
    const newId = `apt-${Date.now()}`;
    const newApt: Appointment = {
      ...a,
      id: newId
    };
    setAppointments((prev) => [newApt, ...prev]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const updateWardOccupancy = (wardId: string, delta: number) => {
    setWards((prev) =>
      prev.map((w) => {
        if (w.id === wardId) {
          const newOccupied = Math.max(0, Math.min(w.total, w.occupied + delta));
          const newPct = Math.round((newOccupied / w.total) * 100);
          return {
            ...w,
            occupied: newOccupied,
            available: w.total - newOccupied,
            percentage: newPct,
            status: newPct >= 90 ? 'Critical' : newPct >= 80 ? 'Near Capacity' : 'Optimal'
          };
        }
        return w;
      })
    );
  };

  const updateInvoiceStatus = (invoiceId: string, status: Invoice['status']) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status } : inv))
    );
  };

  const updateStaffStatus = (staffId: string, status: StaffMember['status']) => {
    setStaff((prev) =>
      prev.map((st) => (st.id === staffId ? { ...st, status } : st))
    );
  };

  const restockItem = (itemId: string, amount: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const newLevel = item.stockLevel + amount;
          return {
            ...item,
            stockLevel: newLevel,
            status: newLevel < item.minThreshold ? 'Critical' : 'In Stock',
            lastRestocked: 'Just now'
          };
        }
        return item;
      })
    );
  };

  const dismissInsight = (id: string) => {
    setAiInsights((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPatientsCount = patients.length;
  const admittedPatientsCount = patients.filter((p) => p.status === 'Admitted' || p.status === 'In Surgery').length;
  const todayAppointmentsCount = appointments.length;
  const totalRevenueToday = 24560;
  
  const totalOccupiedBeds = wards.reduce((sum, w) => sum + w.occupied, 0);
  const totalBedsAvailable = wards.reduce((sum, w) => sum + w.total, 0);
  const overallBedOccupancyPercent = Math.round((totalOccupiedBeds / (totalBedsAvailable || 1)) * 100);

  return (
    <HospitalStoreContext.Provider
      value={{
        patients,
        appointments,
        departments,
        wards,
        invoices,
        staff,
        inventory,
        aiInsights,
        selectedPatient,
        setSelectedPatient,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isBookDemoOpen,
        setIsBookDemoOpen,
        isNewPatientOpen,
        setIsNewPatientOpen,
        isNewAppointmentOpen,
        setIsNewAppointmentOpen,
        addPatient,
        updatePatientStatus,
        addAppointment,
        updateAppointmentStatus,
        updateWardOccupancy,
        updateInvoiceStatus,
        updateStaffStatus,
        restockItem,
        dismissInsight,
        totalPatientsCount,
        admittedPatientsCount,
        todayAppointmentsCount,
        totalRevenueToday,
        overallBedOccupancyPercent
      }}
    >
      {children}
    </HospitalStoreContext.Provider>
  );
}

export function useHospitalStore() {
  const context = useContext(HospitalStoreContext);
  if (!context) {
    throw new Error('useHospitalStore must be used within a HospitalStoreProvider');
  }
  return context;
}
