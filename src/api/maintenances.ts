import Maintenance from "@/types/maintenance";

export const getMaintenances = async (): Promise<Maintenance[]> => {
  const response = await fetch("/api/maintenances");
  const data = await response.json();
  return data;
}

export const getMaintenance = async (id: string): Promise<Maintenance> => {
  const response = await fetch(`/api/maintenances/${id}`);
  const data = await response.json();
  return data;
}

export const createMaintenance = async (maintenance: Maintenance): Promise<Maintenance> => {
  const response = await fetch("/api/maintenances", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(maintenance),
  });
  const data = await response.json();
  return data;
}

export const updateMaintenance = async (maintenance: Maintenance): Promise<Maintenance> => {
  const response = await fetch(`/api/maintenances/${maintenance.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(maintenance),
  });
  const data = await response.json();
  return data;
}

export const deleteMaintenance = async (id: string): Promise<void> => {
  await fetch(`/api/maintenances/${id}`, {
    method: "DELETE",
  });
}