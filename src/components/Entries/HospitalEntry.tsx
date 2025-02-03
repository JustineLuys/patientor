import type { HospitalEntry } from "../../types";
import DiagnosisList from "../Diagnosis/DiagnosisList";

const HospitalEntry = ({ entry }: { entry: HospitalEntry }) => {
  const { date, discharge, description, specialist, diagnosisCodes } = entry;
  return (
    <li className="entry-list-item">
      <p>
        {date} {description}
      </p>
      <p>Specialist: {specialist}</p>
      <p>Discharge Date: {discharge.date}</p>
      <p>Discharge Criteria: {discharge.criteria}</p>
      {!diagnosisCodes ? (
        <p>No diagnosis</p>
      ) : (
        <>
          <h2>Diagnosis:</h2>

          <DiagnosisList codes={diagnosisCodes} />
        </>
      )}
    </li>
  );
};

export default HospitalEntry;
