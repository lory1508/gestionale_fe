import api from "@/http-common";
import Driver from "@/types/driver";

export const getDrivers = async (): Promise<Driver[]> => {
  const response = await api.get('/drivers');
  return response.data;
}

export const getDriver = async (id: string): Promise<Driver> => {
  const response = await fetch(`/api/drivers/${id}`);
  const data = await response.json();
  return data;
}

export const createDriver = async (driver: Driver): Promise<Driver> => {
  console.log(driver);
  const response = await api.post('/drivers', driver);
  return response.data;
  
  // const response = await fetch("/api/drivers", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(driver),
  // });
  // const data = await response.json();
  // return data;
}

// TODO: Fix this
// export const updateDriver = async (driver: Driver): Promise<Driver> => {
//   const response = await fetch(`/api/drivers/${driver.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(driver),
//   });
//   const data = await response.json();
//   return data;
// }

export const deleteDriver = async (id: string | null): Promise<any> => {
  if (!id) return;
  const response = await api.delete(`/drivers/${id}`);
  return response;
}