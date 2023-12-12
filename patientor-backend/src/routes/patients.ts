import express from 'express';
import { toNewPatientEntry, toNewEntry } from '../utils';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else res.sendStatus(404);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatientEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body); // EntryWithoutId
    const patient = patientService.findById(req.params.id);
    if (!patient) {
      res.sendStatus(404);
    }

    const addedEntry = patientService.addEntry(newEntry);
    patient?.entries.push(addedEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// const { name, dateOfBirth, ssn, gender, occupation } = req.body;
// const newPatientEntry: PatientEntry = patientService.addEntry(
//   name,
//   dateOfBirth,
//   ssn,
//   gender,
//   occupation
// );

// res.json(newPatientEntry);
// });

export default router;
