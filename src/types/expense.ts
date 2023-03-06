interface Expense {
  id: string;
  invoiceNumber: string;
  amount: number;
  date: string;
  supplierId: string;
  subject: string;
}

export default Expense;