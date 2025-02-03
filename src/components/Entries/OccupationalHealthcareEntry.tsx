import type { OccupationalHealthcareEntry } from "../../types";
import DiagnosisList from "../Diagnosis/DiagnosisList";

const OccupationalHealthcareEntry = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  console.log(entry);
  const {
    date,
    employerName,
    description,
    specialist,
    diagnosisCodes,
    sickLeave,
  } = entry;
  return (
    <li className="entry-list-item">
      <p>
        {date} {description}
      </p>
      <p>Specialist: {specialist}</p>
      <p>Employer: {employerName}</p>
      {sickLeave && (
        <>
          <p>Sick Leave start date:{sickLeave.startDate}</p>
          <p>Sick Leave end date:{sickLeave.endDate}</p>
        </>
      )}
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

export default OccupationalHealthcareEntry;
