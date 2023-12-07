import { NewPatientEntry } from './types';

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  console.log(object);
  const newEntry: NewPatientEntry = {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
    ssn: parseString(object.ssn, 'ssn'),
    gender: parseString(object.ssn, 'ssn'),
    occupation: parseString(object.ssn, 'ssn'),
  };
  return newEntry;
};

const parseString = (string: unknown, name: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`Incorrect or missing ${name}: ${string}`);
  }

  return string;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown, name: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing ${name}: ${date}`);
  }

  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (string: unknown, name: string): string => {
  if (!string || !isString(string) || !isGender(string)) {
    throw new Error(`Incorrect or missing ${name}: ${string}`);
  }

  return string;
};

const isGender = (string: string): boolean => {
  return true;
};
