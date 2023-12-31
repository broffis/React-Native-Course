import { createContext, useMemo, useReducer } from "react";
import { Expense, NewExpense } from "../constants/types";
import { DUMMY_EXPENSES } from "../constants/data";

type ExpensesContextType = {
  expenses: Expense[];
  // addExpense: (expense: NewExpense) => void;
  addExpense: (expense: Expense) => void;
  deleteExpense: (expenseId: string) => void;
  updateExpense: (id: string, expense: NewExpense) => void;
  setExpenses: (expenses: Expense[]) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, date, amount }) => {},
  setExpenses: (expenses: Expense[]) => {},
});

type ExpensesAction =
  // | { type: "ADD"; payload: NewExpense }
  | { type: "ADD"; payload: Expense }
  | { type: "UPDATE"; payload: { id: string; expense: NewExpense } }
  | { type: "DELETE"; payload: string }
  | { type: "SET"; payload: Expense[] };

const expensesReducer = (state: Expense[], action: ExpensesAction) => {
  switch (action.type) {
    case "ADD":
      // const id = `${new Date().toString()} ${Math.random().toString()}`;
      // return [...state, { ...action.payload, id }];
      return [...state, action.payload];
    case "UPDATE":
      const [selectedExpense] = state.filter(
        (expense) => expense.id === action.payload.id
      );

      const updatedExpense = {
        ...selectedExpense,
        ...action.payload.expense,
      };

      const updatedExpenses = state.map((expense) =>
        expense.id === action.payload.id ? updatedExpense : expense
      );

      return updatedExpenses;
    case "SET":
      const sorted = action.payload.sort(
        (a, b) => b.date.getTime() - a.date.getTime()
      );
      return sorted;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

export const ExpensesContextProvider = ({ children }) => {
  // const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  // const addExpense = (expenseData: NewExpense) => {
  const addExpense = (expenseData: Expense) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (expenseId: string) => {
    dispatch({ type: "DELETE", payload: expenseId });
  };

  const updateExpense = (id: string, expenseData: NewExpense) => {
    dispatch({ type: "UPDATE", payload: { id, expense: expenseData } });
  };

  const setExpenses = (expenses: Expense[]) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const value = useMemo(
    () => ({
      expenses: expensesState,
      addExpense,
      deleteExpense,
      updateExpense,
      setExpenses,
    }),
    [expensesState, addExpense, deleteExpense, updateExpense, setExpenses]
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};
