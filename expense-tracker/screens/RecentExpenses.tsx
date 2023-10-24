import { useContext, useEffect, useState } from "react";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";
// import { Expense } from "../constants/types";

export const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  // const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        const fetchedExpenses = await fetchExpenses();
        setExpenses(fetchedExpenses);
      } catch (error) {
        // setError(error.message);
        setError("Could not fetch expenses");
      }
      setIsLoading(false);
    };

    getExpenses();
  }, []);

  const errorHandler = () => {
    setError("");
  };

  if (error && !isLoading)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  if (isLoading) return <LoadingOverlay />;

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered in last 7 days"
    />
  );
};
