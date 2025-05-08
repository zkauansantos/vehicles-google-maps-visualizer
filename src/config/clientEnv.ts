import { z } from "zod";

const clientEnvSchema = z.object({
  googleMapsApiKey: z
    .string()
    .min(1, { message: "Missing Google Maps API Key" }),
  googleMapsMapId: z.string().min(1, { message: "Missing Google Maps Map ID" }),
});

export const clientEnv = clientEnvSchema.parse({
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  googleMapsMapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
});
