import { Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryList = ({ entries }: { entries: Entry[] }) => {
  return (
    <div>
      <ul>
        {entries.map((entry) => {
          switch (entry.type) {
            case "HealthCheck":
              return <HealthCheckEntry key={entry.id} entry={entry} />;
            case "Hospital":
              return <HospitalEntry key={entry.id} entry={entry} />;
            case "OccupationalHealthcare":
              return (
                <OccupationalHealthcareEntry key={entry.id} entry={entry} />
              );
            default:
              return assertNever(entry);
          }
        })}
      </ul>
    </div>
  );
};

export default EntryList;
