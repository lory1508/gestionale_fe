import Invoice from "@/types/invoice";

export const getInvoices = async (): Promise<Invoice[]> => {
  const response = await fetch("/api/invoices");
  const data = await response.json();
  return data;
}

export const getInvoice = async (id: string): Promise<Invoice> => {
  const response = await fetch(`/api/invoices/${id}`);
  const data = await response.json();
  return data;
}

export const createInvoice = async (invoice: Invoice): Promise<Invoice> => {
  const response = await fetch("/api/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  });
  const data = await response.json();
  return data;
}

export const updateInvoice = async (invoice: Invoice): Promise<Invoice> => {
  const response = await fetch(`/api/invoices/${invoice.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  });
  const data = await response.json();
  return data;
}

export const deleteInvoice = async (id: string): Promise<void> => {
  await fetch(`/api/invoices/${id}`, {
    method: "DELETE",
  });
}
