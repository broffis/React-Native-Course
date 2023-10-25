import axios from "axios";
import { Expense, ExpenseData } from "../constants/types";

const FIREBASE_URL =
  "https://react-native-expense-tra-a0ac6-default-rtdb.firebaseio.com/";

// const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

type FirebaseExpenseResponse = {
  name: string;
  amount: number;
  date: string;
  description: string;
};

export const storeExpense = async (
  expenseData: ExpenseData
): Promise<string> => {
  const response = await axios.post<FirebaseExpenseResponse>(
    `${FIREBASE_URL}/expenses.json`,
    expenseData
  );

  return response.data.name;
};

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get<Expense[]>(`${FIREBASE_URL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const { amount, date, description } = response.data[key];
    expenses.push({
      id: key,
      amount,
      date: new Date(date),
      description,
    });
  }

  return expenses;
};

export const updateExpense = (id: string, expenseData: ExpenseData) => {
  return axios.put(`${FIREBASE_URL}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id: string) => {
  return axios.delete(`${FIREBASE_URL}/expenses/${id}.json`);
};
