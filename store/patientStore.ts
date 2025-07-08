import { mockPatients } from "@/data/mockPatient";
import { Patient } from "@/types/patient";
import { create } from "zustand";

interface PatientStore {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: mockPatients,
  addPatient: (patient) =>
    set((state) => ({
      patients: [...state.patients, patient],
    })),
}));
