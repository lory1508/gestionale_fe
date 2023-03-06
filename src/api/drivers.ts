import Driver from "@/types/driver";

export const getDrivers = async (): Promise<Driver[]> => {
  const response = await fetch("/api/drivers");
  const data = await response.json();
  return data;
}

export const getDriver = async (id: string): Promise<Driver> => {
  const response = await fetch(`/api/drivers/${id}`);
  const data = await response.json();
  return data;
}

export const createDriver = async (driver: Driver): Promise<Driver> => {
  const response = await fetch("/api/drivers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(driver),
  });
  const data = await response.json();
  return data;
}

export const updateDriver = async (driver: Driver): Promise<Driver> => {
  const response = await fetch(`/api/drivers/${driver.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(driver),
  });
  const data = await response.json();
  return data;
}

export const deleteDriver = async (id: string): Promise<void> => {
  await fetch(`/api/drivers/${id}`, {
    method: "DELETE",
  });
}