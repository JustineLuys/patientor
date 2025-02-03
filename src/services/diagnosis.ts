import axios, { AxiosError } from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

export const getDiagnosis = async (codes: Array<Diagnosis["code"]>) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/diagnosis`, codes, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};
