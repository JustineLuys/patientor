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
import { newOccupationalHealthcareEntrySchema } from "../schema";
import { addEntryToPatient } from "../services/patient";
import { NewOccupationalHealthcareEntry } from "../types";

export default function OccupationalHealthcareEntryForm({
  patientId,
}: {
  patientId: string;
}) {
  const [entryData, setEntryData] = useState<NewOccupationalHealthcareEntry>({
    date: "",
    description: "",
    specialist: "",
    type: "OccupationalHealthcare",
    diagnosisCodes: [],
    employerName: "",
    sickLeave: undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEntryData({
      ...entryData,
      [name]: value,
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
    const result = newOccupationalHealthcareEntrySchema.safeParse(entryData);

    if (!result.success) {
      let errMessage = "";
      const errLength = result.error.issues.length;
      result.error.issues.forEach((err, index) => {
        if (errLength < 2) {
          errMessage += `${err.message}.`;
        } else {
          if (errLength - 1 === index) {
            errMessage += `and ${err.message}. `;
          } else {
            errMessage += `${err.message}, `;
          }
        }
      });
      alert(errMessage);
      return;
    }
    await addEntryToPatient(patientId, result.data);
  };

  const handleSickLeave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newEntryData = {
      ...entryData,
      sickLeave: {
        ...entryData.sickLeave,
        [name]: value,
      },
    };
    console.log(newEntryData);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Occupational Healthcare Entry Form</h2>
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
        <InputLabel id="sickleave-start-date">
          Sick Leave Start Date:
        </InputLabel>
        <Input
          type="date"
          name="startDate"
          id="sickleave-start-date"
          value={entryData.sickLeave?.startDate}
          onChange={handleSickLeave}
        />
      </div>
      <div>
        <InputLabel id="sickleave-end-date">Sick Leave End Date:</InputLabel>
        <Input
          type="date"
          name="endDate"
          id="sickleave-end-date"
          value={entryData.sickLeave?.endDate}
          onChange={handleSickLeave}
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
      <div>
        <InputLabel id="employer-name">Employer Name:</InputLabel>
        <Input
          type="text"
          name="employerName"
          id="employer-name"
          value={entryData.employerName}
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
