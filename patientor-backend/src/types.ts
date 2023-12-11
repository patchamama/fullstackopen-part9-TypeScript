// {
//     code: 'M24.2',
//     name: 'Disorder of ligament',
//     latin: 'Morbositas ligamenti',
//   },

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

// {
//     id: 'd2773336-f723-11e9-8f0b-362b9e155667',
//     name: 'John McClane',
//     dateOfBirth: '1986-07-09',
//     ssn: '090786-122X',
//     gender: 'male',
//     occupation: 'New york city cop',
//   },

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
