import axios, { AxiosError } from "axios";
import { apiBaseUrl } from "../constants";
import { EntryWithoutId } from "../types";

export const getPatientById = async (patientId: string | undefined) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/patients/${patientId}`);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message);
    }
  }
};

export const addEntryToPatient = async (
  patientId: string,
  entry: EntryWithoutId
) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      entry,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message);
    }
  }
};
