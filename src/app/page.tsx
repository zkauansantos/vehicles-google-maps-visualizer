import { FilterVehicles } from "@/components/filter-vehicles";
import { Map } from "@/components/map";
import { Separator } from "@/components/ui/separator";
import { VehiclesTable } from "@/components/vehicles-table";

export default function Homepage() {
  return (
    <main className="w-full pt-20 mx-auto px-4 md:px-9 flex flex-col gap-4">
      <FilterVehicles />

      <Separator />

      <Map />

      <VehiclesTable />
    </main>
  );
}
