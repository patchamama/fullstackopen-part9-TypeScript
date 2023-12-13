import { useParams } from 'react-router-dom';
import { Patient, Entry, EntryWithoutId } from '../types';
import { Icon } from 'semantic-ui-react';
import { useEffect, useState, SyntheticEvent } from 'react';
import patientService from '../services/patients';
import diagnoseService from '../services/diagnoses';
import { Hospital } from './Hospital';
import { OccupationalHealthcare } from './OccupationalHealthcare';
import { HealthCheck } from './HealthCheck';
import {
  TextField,
  Button,
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { Divider, Alert } from '@mui/material';
import axios from 'axios';

import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  console.log('EntryDetails', entry);
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientDetails = () => {
  const [actpatient, setActPatient] = useState<Patient[]>([]);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [entryType, setEntryType] = useState<string>('HealthCheck');
  const [employerName, setEmployerName] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [diagnoseVal, setDiagnoseVal] = useState<string[]>([]);
  const [diagnosisCodesName, setDiagnosisCodesName] = useState<string[]>([]);

  const theme = useTheme();

  useEffect(() => {
    const fetchDiagnoseList = async () => {
      const resultDiagnose = await diagnoseService.getAll();
      const diagnoseCodesName = resultDiagnose.map((diagnose) => diagnose.code);
      setDiagnosisCodesName(diagnoseCodesName);
    };
    void fetchDiagnoseList();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof diagnoseVal>) => {
    const {
      target: { value },
    } = event;
    setDiagnoseVal(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatientList = async () => {
      const resultPatient = await patientService.getId(id as string);
      setActPatient([resultPatient]);
      console.log('result: ', resultPatient);
    };
    void fetchPatientList();
  }, [id]);

  const submitNewEntries = async (values: EntryWithoutId) => {
    try {
      const patient = await patientService.addEntry(
        id as string,
        values as EntryWithoutId
      );
      const resultPatient = await patientService.getId(id as string);
      setActPatient([resultPatient]);
      console.log('result axios: ', patient);
      setFormOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const typeOptions = [
    { label: 'Hospital', value: 'Hospital' },
    { label: 'OccupationalHealthcare', value: 'OccupationalHealthcare' },
    { label: 'HealthCheck', value: 'HealthCheck' },
  ];

  const ShowForm = () => {
    const [data, setData] = useState({
      description: '',
      date: '',
      specialist: '',
      diagnosisCodes: [],
      type: entryType,
    });

    // const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    //   setData({ ...data, [event.target.name]: event.target.value });
    //   console.log('data', event, data);
    // };

    const addEntry = (event: SyntheticEvent) => {
      event.preventDefault();
      console.log('data: ', data);
      const newEntry: EntryWithoutId = {
        description: data.description,
        date: data.date,
        specialist: data.specialist,
        // diagnosisCodes: data.diagnosisCodes,
        type: data.type as
          | 'HealthCheck'
          | 'Hospital'
          | 'OccupationalHealthcare',

        // healthCheckRating: data.healthCheckRating,
      };
      if (data.type === 'OccupationalHealthcare') {
        newEntry.employerName = employerName;
        newEntry.sickLeave = {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd,
        };
        newEntry.diagnosisCodes = diagnosisCodes.split(',');
      }
      if (data.type === 'HealthCheck') {
        newEntry.healthCheckRating = healthCheckRating;
      }
      if (data.type === 'Hospital') {
        newEntry.discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria,
        };
        newEntry.diagnosisCodes = diagnosisCodes.split(',');
      }
      submitNewEntries(newEntry);
    };

    return (
      <div>
        {error && <Alert severity='error'>{error}</Alert>}
        <h3>New Health entry</h3>

        <form onSubmit={addEntry}>
          <TextField
            label='description'
            name='description'
            fullWidth
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
            value={data.description}
          />

          <TextField
            label='date'
            placeholder='YYYY-MM-DD'
            name='date'
            type='date'
            fullWidth
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
            value={data.date}
          />

          <TextField
            label='specialist'
            name='specialist'
            fullWidth
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
            value={data.specialist}
          />

          <InputLabel style={{ marginTop: 20 }}>type</InputLabel>
          <Select
            label='type'
            name='type'
            fullWidth
            value={data.type}
            onChange={(event) => {
              setData({ ...data, [event.target.name]: event.target.value });
              console.log('event.target.value', event.target.value);
              setEntryType(event.target.value);
            }}
          >
            {typeOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          {data.type === 'OccupationalHealthcare' && (
            <>
              <TextField
                label='employerName'
                name='employerName'
                fullWidth
                onChange={(event) => {
                  setEmployerName(event.target.value);
                  setData({ ...data, [event.target.name]: event.target.value });
                }}
                value={employerName}
              />

              <InputLabel style={{ marginTop: 20 }}>Sickleave</InputLabel>

              <TextField
                style={{ marginLeft: 20 }}
                label='start'
                placeholder='YYYY-MM-DD'
                name='sickLeaveStartDate'
                type='date'
                fullWidth
                onChange={(event) => setSickLeaveStart(event.target.value)}
                value={sickLeaveStart}
              />

              <TextField
                style={{ marginLeft: 20 }}
                label='end'
                placeholder='YYYY-MM-DD'
                name='sickLeaveStartDate'
                type='date'
                fullWidth
                onChange={(event) => setSickLeaveEnd(event.target.value)}
                value={sickLeaveEnd}
              />
            </>
          )}

          {data.type === 'OccupationalHealthcare' && (
            <>
              <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>

              <TextField
                style={{ marginLeft: 20 }}
                label='date'
                placeholder='YYYY-MM-DD'
                name='dischargeDate'
                type='date'
                fullWidth
                onChange={(event) => setDischargeDate(event.target.value)}
                value={dischargeDate}
              />

              <TextField
                style={{ marginLeft: 20 }}
                label='criteria'
                name='dischargeCriteria'
                fullWidth
                onChange={(event) => setDischargeCriteria(event.target.value)}
                value={dischargeCriteria}
              />
            </>
          )}

          {(data.type === 'OccupationalHealthcare' ||
            data.type === 'Hospital') && (
            <>
              <InputLabel id='demo-multiple-chip-label'>Diagnoses</InputLabel>
              <Select
                labelId='demo-multiple-chip-label'
                id='demo-multiple-chip'
                multiple
                value={diagnoseVal}
                onChange={handleChange}
                input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {diagnosisCodesName.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, diagnoseVal, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}

          {data.type === 'HealthCheck' && (
            <TextField
              label='healthCheckRating'
              name='healthCheckRating'
              fullWidth
              onChange={(event) => {
                setData({ ...data, [event.target.name]: event.target.value });
                setHealthCheckRating(Number(event.target.value));
              }}
              value={healthCheckRating}
            />
          )}

          <Grid>
            <Grid item>
              <Button
                color='secondary'
                variant='contained'
                style={{ float: 'left' }}
                type='button'
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: 'right',
                }}
                type='submit'
                variant='contained'
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  };

  const patient: Patient | undefined = actpatient[0];
  console.log(patient);
  // const patient = Object.values(patients).find(
  //   (patient: Patient) => patient.id === id
  // );

  if (!patient) {
    return (
      <div>
        <h2>404</h2>
        <Icon name='warning circle' />
        <p>patient not found</p>
      </div>
    );
  }

  let iconName: 'man' | 'woman' | 'genderless';

  switch (patient.gender) {
    case 'male':
      iconName = 'man';
      break;
    case 'female':
      iconName = 'woman';
      break;
    case 'other':
      iconName = 'genderless';
      break;
    default:
      iconName = 'woman';
  }

  return (
    <div>
      {patient && (
        <div>
          <h2>
            {patient.name} <Icon name={iconName} />{' '}
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h2>entries</h2>
          {formOpen ? (
            <ShowForm />
          ) : (
            <Button variant='contained' onClick={() => setFormOpen(true)}>
              Add New Entry
            </Button>
          )}
          <Divider />
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
