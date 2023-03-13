import api from "@/http-common";
import Customer from "@/types/customer";

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await api.get('/customers');
  return response.data;
}

export const getCustomer = async (id: string): Promise<Customer> => {
  const response = await fetch(`/api/customers/${id}`);
  const data = await response.json();
  return data;
}

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await fetch("/api/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  const data = await response.json();
  return data;
}

export const updateCustomer = async (customer: Customer): Promise<Customer> => {
  const response = await fetch(`/api/customers/${customer.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  const data = await response.json();
  return data;
}

export const deleteCustomer = async (id: string): Promise<void> => {
  await fetch(`/api/customers/${id}`, {
    method: "DELETE",
  });
}