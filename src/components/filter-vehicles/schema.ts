import { z } from "zod";

import { VehicleType } from "./types";

export const filterVehiclesSchema = z.object({
  filter: z.string().optional(),
  type: z.nativeEnum(VehicleType).refine((value) => !!value, {
    message: "Campo obrigatório",
  }),
});

export type FilterVehiclesFormData = z.infer<typeof filterVehiclesSchema>;
