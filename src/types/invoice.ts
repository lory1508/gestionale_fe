import Customer from "./customer";

interface Invoice {
  _id: string;
  invoiceNumber: string;
  amount: number;
  date: string;
  customer: Customer;
  paid: boolean;
}

export default Invoice;