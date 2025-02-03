import { useEffect, useState } from "react";
import { Diagnosis } from "../../types";
import { getDiagnosis } from "../../services/diagnosis";

const DiagnosisList = ({ codes }: { codes: Array<Diagnosis["code"]> }) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const data = await getDiagnosis(codes);
        setDiagnosis(data);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
    fetchDiagnosis();
  }, [codes]);
  return (
    <ul>
      {diagnosis.map((d) => (
        <li key={d.code}>
          <p>
            {d.code} {d.name}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default DiagnosisList;
