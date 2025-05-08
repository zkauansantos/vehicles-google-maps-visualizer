import { z } from "zod";

const serverEnvSchema = z.object({
  apiUrl: z
    .string()
    .url({ message: "Invalid API URL" })
    .min(1, { message: "Missing API URL" }),
  authorizationApiKey: z
    .string()
    .min(1, { message: "Missing Authorization API Key" }),
});

export const serverEnv = serverEnvSchema.parse({
  apiUrl: process.env.API_URL,
  authorizationApiKey: process.env.TOKEN_API_KEY,
});
