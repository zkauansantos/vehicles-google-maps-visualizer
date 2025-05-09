import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const vehiclesShimmers = Array.from({ length: 20 });

export function VehiclesTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Placa</TableHead>
          <TableHead>Frota</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Modelo</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {vehiclesShimmers.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableRow key={`${Math.random()}-${index}`}>
            <TableCell>
              <Skeleton className="w-20 h-4 rounded-sm mx-auto" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-20 h-4 rounded-sm mx-auto" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-20 h-4 rounded-sm mx-auto" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-20 h-4 rounded-sm mx-auto" />
            </TableCell>
            <TableCell>
              {" "}
              <Skeleton className="w-20 h-4 rounded-sm mx-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
