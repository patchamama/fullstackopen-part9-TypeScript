import diagnoses from '../../data/dignoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
