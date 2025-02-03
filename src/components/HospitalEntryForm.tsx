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
import { newHospitalEntrySchema } from "../schema";
import { addEntryToPatient } from "../services/patient";
import { NewHospitalEntry } from "../types";

export default function HospitalEntryForm({
  patientId,
}: {
  patientId: string;
}) {
  const [entryData, setEntryData] = useState<NewHospitalEntry>({
    date: "",
    description: "",
    specialist: "",
    type: "Hospital",
    diagnosisCodes: [],
    discharge: {
      date: "",
      criteria: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEntryData({
      ...entryData,
      [name]: value,
    });
  };
  const handleDischarge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newEntryData = {
      ...entryData,
      discharge: {
        ...entryData.discharge,
        [name]: value,
      },
    };
    setEntryData(newEntryData);
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
    const result = newHospitalEntrySchema.safeParse(entryData);

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

  return (
    <form onSubmit={handleFormSubmit}>
      <h2>Hospital Entry Form</h2>
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
        <InputLabel id="discharge-date">Discharge date:</InputLabel>
        <Input
          type="date"
          name="date"
          id="discharge-date"
          value={entryData.discharge.date}
          onChange={handleDischarge}
        />
      </div>
      <div>
        <InputLabel id="discharge-criteria">Discharge Criteria:</InputLabel>
        <Input
          type="text"
          name="criteria"
          id="discharge-criteria"
          value={entryData.discharge.criteria}
          onChange={handleDischarge}
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
