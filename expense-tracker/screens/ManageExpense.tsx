import { StyleSheet, Text, View } from "react-native";
// import { Route, Router } from "@react-navigation/native";
import { FunctionComponent, useContext, useLayoutEffect } from "react";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { Button } from "../components/UI/Button";
import { NavigationProp } from "@react-navigation/native";
import { ExpensesContext } from "../store/expenses-context";
import { Expense, NewExpense } from "../constants/types";

type ExpenseRoute = {
  routeName: string;
  params?: {
    expenseId: string;
  };
};

type ManageExpenseProps = {
  // route: Route<ExpenseRoute>;
  route: ExpenseRoute;
  navigation: NavigationProp<ReactNavigation.RootParamList>;
};

export const ManageExpense: FunctionComponent<ManageExpenseProps> = ({
  route,
  navigation,
}) => {
  const { expenseId } = route.params || {};
  const isEditing = !!expenseId;

  const { expenses, deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext);

  const deleteExpenseHandler = () => {
    deleteExpense(expenseId);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = () => {
    if (isEditing) {
      updateExpense(expenseId, {
        description: "Test!!!!!!!",
        amount: 19.99,
        date: new Date("2023-05-18"),
      });
    } else {
      addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2023-05-19"),
      });
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
