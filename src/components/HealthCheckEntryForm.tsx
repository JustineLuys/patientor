import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import diagnosisData from "../constants";
import { NewHealthCheckEntry } from "../types";
import { newHealthCheckEntrySchema } from "../schema";
import { addEntryToPatient } from "../services/patient";

export default function HealthCheckEntryForm({
  patientId,
}: {
  patientId: string;
}) {
  const [entryData, setEntryData] = useState<NewHealthCheckEntry>({
    date: "",
    description: "",
    healthCheckRating: 0,
    specialist: "",
    type: "HealthCheck",
    diagnosisCodes: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(+value, name);

    setEntryData({
      ...entryData,
      [name]: name === "healthCheckRating" ? +value : value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setEntryData({
      ...entryData,
      [name]: [...(entryData.diagnosisCodes || []), value],
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = newHealthCheckEntrySchema.safeParse(entryData);

    if (!result.success) {
      let errMessage = "";
      const errLength = result.error.issues.length - 1;
      result.error.issues.forEach(
        (err, index) =>
          (errMessage += `${
            errLength === index ? `and ${err.message}.` : `${err.message}, `
          }`)
      );
      alert(errMessage);
      return;
    }
    await addEntryToPatient(patientId, result.data);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Health Check Entry Form</h2>
      <div>
        <InputLabel id="description">Description:</InputLabel>
        <Input
          type="text"
          name="description"
          id="description"
          value={entryData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <InputLabel id="date">Date:</InputLabel>
        <Input type="date" name="date" id="date" onChange={handleInputChange} />
      </div>
      <div>
        <InputLabel id="healthCheckRating">Healthcheck Rating:</InputLabel>
        <Input
          type="number"
          name="healthCheckRating"
          id="healthCheckRating"
          value={entryData.healthCheckRating}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <InputLabel id="specialist">Specialist:</InputLabel>
        <Input
          type="text"
          name="specialist"
          id="specialist"
          value={entryData.specialist}
          onChange={handleInputChange}
        />
      </div>

      <InputLabel id="diagnosis-codes">Diagnosis Codes:</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={entryData.diagnosisCodes![0] || ""}
        label="Diagnosis Codes"
        name="diagnosisCodes"
        onChange={handleSelectChange}
        fullWidth
      >
        {diagnosisData.map((d) => (
          <MenuItem value={d.code} key={d.code}>
            {d.code}
          </MenuItem>
        ))}
      </Select>
      <Button type="submit">Add entry</Button>
    </form>
  );
}
