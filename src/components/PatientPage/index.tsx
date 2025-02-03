import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatientById } from "../../services/patient";
import { EntryType, Patient } from "../../types";
import EntryList from "../Entries/EntryList";
import HealthCheckEntryForm from "../HealthCheckEntryForm";
import HospitalEntryForm from "../HospitalEntryForm";
import OccupationalHealthcareEntryForm from "../OccupationalHealthcareEntryForm";
import { Button } from "@mui/material";

export default function PatientPage() {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [entryFormType, setEntryFormType] = useState<EntryType | null>(null);

  useEffect(() => {
    const fetchPatientById = async () => {
      try {
        const data = await getPatientById(id);
        setPatient(data);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };
    fetchPatientById();
  }, [id]);

  const openEntryForm = (formType: EntryType) =>
    formType === entryFormType
      ? setEntryFormType(null)
      : setEntryFormType(formType);

  return (
    patient && (
      <main>
        <h2>
          {patient.name}{" "}
          <span>
            {patient.gender === "male"
              ? "♂️"
              : patient.gender === "female"
              ? "♀️"
              : "⚥"}
          </span>
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <Button onClick={() => openEntryForm("HealthCheck")}>
          Add health check entry
        </Button>
        <Button onClick={() => openEntryForm("Hospital")}>
          Add hospital entry
        </Button>
        <Button onClick={() => openEntryForm("OccupationalHealthcare")}>
          Add occupational healthcare entry
        </Button>
        {entryFormType === "HealthCheck" && (
          <HealthCheckEntryForm patientId={patient.id} />
        )}
        {entryFormType === "Hospital" && (
          <HospitalEntryForm patientId={patient.id} />
        )}
        {entryFormType === "OccupationalHealthcare" && (
          <OccupationalHealthcareEntryForm patientId={patient.id} />
        )}
        <h2>Entries:</h2>
        {patient.entries.length ? (
          <EntryList entries={patient.entries} />
        ) : (
          <p>No Patient Entries</p>
        )}
      </main>
    )
  );
}
