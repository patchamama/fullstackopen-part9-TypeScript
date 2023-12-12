import { useParams } from 'react-router-dom';
import { Patient, Entry } from '../types';
import { Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import { Hospital } from './Hospital';
import { OccupationalHealthcare } from './OccupationalHealthcare';
import { HealthCheck } from './HealthCheck';

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

  const { id } = useParams<{ id: string }>();
  // let patient: Patient | undefined;

  useEffect(() => {
    const fetchPatientList = async () => {
      const resultPatient = await patientService.getId(id as string);
      setActPatient([resultPatient]);
      console.log('result: ', resultPatient);
    };
    void fetchPatientList();
  }, [id]);

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
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
