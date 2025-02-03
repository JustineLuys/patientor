import type { HealthCheckEntry } from "../../types";
import DiagnosisList from "../Diagnosis/DiagnosisList";

const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => {
  console.log(entry);
  const { date, description, healthCheckRating, specialist, diagnosisCodes } =
    entry;
  return (
    <li className="entry-list-item">
      <p>
        {date} {description}
      </p>
      <p>Specialist: {specialist}</p>
      <p>Health Rating: {healthCheckRating}</p>
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

export default HealthCheckEntry;
