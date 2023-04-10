import api from "@/http-common";
import Customer from "@/types/customer";

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await api.get('/customers');
  return response.data;
}

export const getCustomer = async (id: string): Promise<Customer> => {
  const res = await api.get(`/customers/${id}`);
  return res.data;
}

export const createCustomer = async (customer: Customer): Promise<Customer> => {
  const res = await api.post('/customers', customer);
  return res.data;
}

export const updateCustomer = async (customer: Customer): Promise<Customer> => {
  const res = await api.patch(`/customers/${customer._id}`, customer);
  return res.data;
}

export const deleteCustomer = async (id: string | null): Promise<number> => {
  if (!id) return 500;
  const res = await api.delete(`/customers/${id}`);
  return res.status;
}