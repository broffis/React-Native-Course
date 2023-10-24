import { StyleSheet, Text, TextInput, View } from "react-native";
// import { Route, Router } from "@react-navigation/native";
import {
  FunctionComponent,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { NavigationProp } from "@react-navigation/native";
import { ExpensesContext } from "../store/expenses-context";
import { ExpenseData } from "../constants/types";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import {
  storeExpense,
  updateExpense as axiosUpdateExpense,
  deleteExpense as axiosDeleteExpense,
} from "../utils/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { expenseId } = route.params || {};
  const isEditing = !!expenseId;

  const { expenses, deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext);

  const selectedExpense = expenses.find((e) => e.id === expenseId);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await axiosDeleteExpense(expenseId);
      deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense. Please try again later");
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData: ExpenseData) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        updateExpense(expenseId, expenseData);
        await axiosUpdateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id });
      }
    } catch (error) {
      setError("Could not save expense. Please try again later");
      setIsSubmitting(false);
    }

    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const errorHandler = () => {
    setError("");
  };

  if (error && !isSubmitting)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  if (isSubmitting) return <LoadingOverlay />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitBUttonLabel={isEditing ? "Update" : "Add"}
        defaultValue={selectedExpense}
      />
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
});
