import patients from '../../data/patients-full';
import { v1 as uuid } from 'uuid';
import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
  EntryWithoutId,
  Entry,
} from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

export const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

export const addPatientEntry = (entry: NewPatientEntry): PatientEntry => {
  const id: string = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export const addEntry = (entry: EntryWithoutId): Entry => {
  const id: string = uuid();
  const newEntry = {
    id,
    ...entry,
  };

  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatientEntry,
  addEntry,
  findById,
};
