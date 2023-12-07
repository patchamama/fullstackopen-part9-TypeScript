import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
} from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

export const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const id: string = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById,
};
