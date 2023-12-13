import { useParams } from 'react-router-dom';
import { Patient, Entry, EntryWithoutId } from '../types';
import { Icon } from 'semantic-ui-react';
import { useEffect, useState, SyntheticEvent } from 'react';
import patientService from '../services/patients';
import { Hospital } from './Hospital';
import { OccupationalHealthcare } from './OccupationalHealthcare';
import { HealthCheck } from './HealthCheck';
import { TextField, Button, Grid } from '@mui/material';
import { Divider, Alert } from '@mui/material';
import axios from 'axios';

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
      const patient = await patientService.addEntry(id as string, values);
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

  const ShowForm = () => {
    const [data, setData] = useState({
      description: '',
      date: '',
      specialist: '',
      diagnosisCodes: [],
      type: 'HealthCheck',
      healthCheckRating: 0,
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
        diagnosisCodes: data.diagnosisCodes,
        type: data.type as 'HealthCheck', //  | 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck',
        healthCheckRating: data.healthCheckRating,
      };
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

          <TextField
            label='diagnosisCodes'
            name='diagnosisCodes'
            fullWidth
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
            value={data.diagnosisCodes}
          />

          <TextField
            label='type'
            name='type'
            fullWidth
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
            value={data.type}
          />

          {/* <TextField
            label='discharge'
            name='discharge'
            fullWidth
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
            value={data.discharge}
          />

          <TextField
            label='employerName'
            name='employerName'
            fullWidth
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
            value={data.employerName}
          />

          <TextField
            label='sickLeave'
            name='sickLeave'
            fullWidth
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
            value={data.sickLeave}
          /> */}

          <TextField
            label='healthCheckRating'
            name='healthCheckRating'
            fullWidth
            onChange={(event) =>
              setData({ ...data, [event.target.name]: event.target.value })
            }
            value={data.healthCheckRating}
          />

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
          <hr />
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
