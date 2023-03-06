import Expense from "@/types/expense";

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await fetch("/api/expenses");
  const data = await response.json();
  return data;
}

export const getExpense = async (id: string): Promise<Expense> => {
  const response = await fetch(`/api/expenses/${id}`);
  const data = await response.json();
  return data;
}

export const createExpense = async (expense: Expense): Promise<Expense> => {
  const response = await fetch("/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  const data = await response.json();
  return data;
}

export const updateExpense = async (expense: Expense): Promise<Expense> => {
  const response = await fetch(`/api/expenses/${expense.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  const data = await response.json();
  return data;
}

export const deleteExpense = async (id: string): Promise<void> => {
  await fetch(`/api/expenses/${id}`, {
    method: "DELETE",
  });
}