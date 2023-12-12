import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import Diagnoses from './Diagnoses';

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
            {patient.name} {'('}
            {iconName}
            {') '} <Icon name={iconName} />{' '}
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h2>entries</h2>
          {patient.entries.map((entry) => (
            <div key={entry.id}>
              <p>
                {entry.date} <i>{entry.description}</i>
              </p>
              <ul>
                {entry.diagnosisCodes?.map((code) => (
                  <li key={code}>
                    <Diagnoses code={code} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
