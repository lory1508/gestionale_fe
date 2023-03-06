import Supplier from "@/types/supplier";

export const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await fetch("/api/suppliers");
  const data = await response.json();
  return data;
}

export const getSupplier = async (id: string): Promise<Supplier> => {
  const response = await fetch(`/api/suppliers/${id}`);
  const data = await response.json();
  return data;
}

export const createSupplier = async (supplier: Supplier): Promise<Supplier> => {
  const response = await fetch("/api/suppliers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplier),
  });
  const data = await response.json();
  return data;
}

export const updateSupplier = async (supplier: Supplier): Promise<Supplier> => {
  const response = await fetch(`/api/suppliers/${supplier.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplier),
  });
  const data = await response.json();
  return data;
}

export const deleteSupplier = async (id: string): Promise<void> => {
  await fetch(`/api/suppliers/${id}`, {
    method: "DELETE",
  });
}