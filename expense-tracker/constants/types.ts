export type Expense = {
  id: string;
  amount: number;
  description: string;
  date: Date;
};

export type NewExpense = Omit<Expense, "id">;

export type ExpenseData = {
  amount: number;
  date: Date;
  description: string;
};
