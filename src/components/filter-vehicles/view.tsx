import { Search } from "lucide-react";
import { Controller } from "react-hook-form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { useFilterVehiclesModel } from "./model";
import { VehicleType, VehicleTypeToText } from "./types";

type FilterVehiclesViewProps = ReturnType<typeof useFilterVehiclesModel>;

export function FilterVehiclesView({
  control,
  register,
  onSubmit,
}: FilterVehiclesViewProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-start lg:items-center gap-6 flex-col lg:flex-row justify-between mb-2"
    >
      <div className="flex flex-col sm:flex-row items-start lg:items-center justify-between lg:justify-center w-full lg:w-fit gap-4 lg:gap-32">
        <h5 className="text-white font-secondary font-semibold tracking-[-1%]">
          Lista
        </h5>

        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              onValueChange={onChange}
              defaultValue={VehicleType.TRACKED}
              value={value}
              className="flex"
            >
              {Object.values(VehicleType).map((it) => (
                <div key={it} className="flex items-center space-x-2">
                  <RadioGroupItem value={it} id={it} />
                  <Label htmlFor={it}>{VehicleTypeToText[it]}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
      </div>

      <div className="flex items-center gap-4 w-full lg:w-fit">
        <Input
          placeholder="Buscar por placa ou frota"
          className="w-[279px]"
          {...register("filter")}
        />

        <Button type="submit" className="sm:w-[150px]">
          <Search className="block sm:hidden size-4" />
          <span className="hidden sm:block">Novo</span>
        </Button>
      </div>
    </form>
  );
}
