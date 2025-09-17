import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title required.").max(255),
  description: z
    .string("Description is required.")
    .min(1, "Description is required.")
    .max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title required.").max(255).optional(),
  description: z
    .string("Description is required.")
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId required.")
    .max(255)
    .nullish(),
});
