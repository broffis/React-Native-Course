import { FunctionComponent } from "react";
import { FlatList, ListRenderItem } from "react-native";

import { Expense } from "../../constants/types";
import { ExpenseItem } from "./ExpenseItem";

const renderExpenseItem: ListRenderItem<Expense> = ({
  item,
}: {
  item: Expense;
}) => <ExpenseItem {...item} />;

type ExpensesListProps = {
  expenses: Expense[];
};

export const ExpensesList: FunctionComponent<ExpensesListProps> = ({
  expenses,
}) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};
