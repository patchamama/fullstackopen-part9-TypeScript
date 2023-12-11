import { NewPatientEntry, Gender, Entry } from './types';

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parseGender(object.gender, 'gender'),
      occupation: parseString(object.occupation, 'occupation'),
      entries: parseEntries(object.entries),
    };
    return newEntry;
  }
  throw new Error('Incorrect data: a field missing');
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntries(entries)) {
    throw new Error(`Incorrect or missing entries: ${entries}`);
  }
  return entries;
};

const isEntries = (param: unknown): param is Entry[] => {
  return Array.isArray(param);
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

// const isGender = (param: string): param is Gender => {
//   return (Object.values(Gender) as string[]).includes(param);
// };

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};
