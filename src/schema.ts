import { z } from "zod";
import { Diagnosis, HealthCheckRating } from "./types";

export const newHealthCheckEntrySchema = z.object({
  date: z.string().date(),
  description: z.string().trim().min(1, { message: "Description is required" }),
  specialist: z.string().trim().min(1, { message: "Specialist is required" }),
  type: z.literal("HealthCheck"),
  diagnosisCodes: z
    .array(z.string() as z.ZodType<Diagnosis["code"]>)
    .optional(),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const newHospitalEntrySchema = z.object({
  date: z.string(),
  description: z.string().trim().min(1, { message: "Description is required" }),
  specialist: z.string().trim().min(1, { message: "Specialist is required" }),
  type: z.literal("Hospital"),
  diagnosisCodes: z
    .array(z.string() as z.ZodType<Diagnosis["code"]>)
    .optional(),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const sickLeaveSchema = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
});
export const newOccupationalHealthcareEntrySchema = z.object({
  date: z.string(),
  description: z.string().trim().min(1, { message: "Description is required" }),
  specialist: z.string().trim().min(1, { message: "Specialist is required" }),
  type: z.literal("OccupationalHealthcare"),
  diagnosisCodes: z
    .array(z.string() as z.ZodType<Diagnosis["code"]>)
    .optional(),
  employerName: z.string(),
  sickLeave: sickLeaveSchema.optional(),
});
