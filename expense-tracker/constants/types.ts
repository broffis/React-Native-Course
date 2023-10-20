export type Expense = {
  id: string;
  amount: number;
  description: string;
  date: Date;
};

export type NewExpense = Omit<Expense, "id">;
