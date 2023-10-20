import { StyleSheet, Text, View } from "react-native";
import { ExpensesSummary } from "./ExpensesSummary";
import { ExpensesList } from "./ExpensesList";
import { Expense } from "../../constants/types";
import { FunctionComponent } from "react";
import { GlobalStyles } from "../../constants/styles";

type ExpensesOutputProps = {
  expenses: Expense[];
  expensesPeriod: string;
  fallbackText: string;
};

export const ExpensesOutput: FunctionComponent<ExpensesOutputProps> = ({
  expenses,
  expensesPeriod,
  fallbackText,
}) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
});
