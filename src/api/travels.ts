import Travel from "@/types/travel";

export const getTravels = async (): Promise<Travel[]> => {
  const response = await fetch("/api/travels");
  const data = await response.json();
  return data;
}

export const getTravel = async (id: string): Promise<Travel> => {
  const response = await fetch(`/api/travels/${id}`);
  const data = await response.json();
  return data;
}

export const createTravel = async (travel: Travel): Promise<Travel> => {
  const response = await fetch("/api/travels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travel),
  });
  const data = await response.json();
  return data;
}

export const updateTravel = async (travel: Travel): Promise<Travel> => {
  const response = await fetch(`/api/travels/${travel.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travel),
  });
  const data = await response.json();
  return data;
}

export const deleteTravel = async (id: string): Promise<void> => {
  await fetch(`/api/travels/${id}`, {
    method: "DELETE",
  });
}