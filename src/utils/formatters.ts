// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatQueryParams(filters?: Record<string, any>) {
  if (!filters) return "";

  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    params.append(key, String(value));
  });

  return params.toString() ? `?${params.toString()}` : "";
}

export function formatVehiclePlate(plate: string): string {
  const cleaned = plate.trim().toUpperCase();

  const oldPlateMatch = cleaned.match(/^([A-Z]{3})(\d{4})$/);

  if (oldPlateMatch) {
    return `${oldPlateMatch[1]} ${oldPlateMatch[2]}`;
  }

  const mercosulMatch = cleaned.match(/^([A-Z]{3})(\d{1}[A-Z]{1}\d{2})$/);

  if (mercosulMatch) {
    return `${mercosulMatch[1]} ${mercosulMatch[2]}`;
  }

  return plate;
}
