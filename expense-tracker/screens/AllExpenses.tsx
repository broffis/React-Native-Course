import { useContext, useEffect, useState } from "react";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses } from "../utils/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";

export const AllExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getExpenses = async () => {
      const fetchedExpenses = await fetchExpenses();
      setExpenses(fetchedExpenses);
      setIsLoading(false);
    };

    getExpenses();
  }, []);

  if (isLoading) return <LoadingOverlay />;

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found"
    />
  );
};
