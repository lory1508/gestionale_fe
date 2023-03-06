import Vehicle from "@/types/vehicle";

export const getVehicles = async (): Promise<Vehicle[]> => {
  const response = await fetch("/api/vehicles");
  const data = await response.json();
  return data;
}

export const getVehicle = async (id: string): Promise<Vehicle> => {
  const response = await fetch(`/api/vehicles/${id}`);
  const data = await response.json();
  return data;
}

export const createVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
  const response = await fetch("/api/vehicles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicle),
  });
  const data = await response.json();
  return data;
}

export const updateVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
  const response = await fetch(`/api/vehicles/${vehicle.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicle),
  });
  const data = await response.json();
  return data;
}

export const deleteVehicle = async (id: string): Promise<void> => {
  await fetch(`/api/vehicles/${id}`, {
    method: "DELETE",
  });
}