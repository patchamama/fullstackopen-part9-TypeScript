import { useEffect, useState } from 'react';
import diagnoseServices from '../services/diagnoses';
import { Diagnosis } from '../types';

const Diagnoses = ({ code }: { code: string }) => {
  const [diagnoses, setDiagnoses] = useState<{
    [code: string]: Diagnosis;
  }>({});
  useEffect(() => {
    const fetchDiagnoseList = async () => {
      const data = await diagnoseServices.getAll();
      const dataObj = data.reduce(
        (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
        {}
      );
      setDiagnoses(dataObj);
      console.log(data);
    };
    fetchDiagnoseList();
  }, []);

  return (
    <div>
      {code} {diagnoses[code]?.name}
    </div>
  );
};

export default Diagnoses;
