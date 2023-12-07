import express from 'express';

import patientService from '../services/patientService';
import { PatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) res.send(patient);
  else res.sendStatus(404);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry: PatientEntry = patientService.addEntry(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );

  res.json(newPatientEntry);
});

export default router;