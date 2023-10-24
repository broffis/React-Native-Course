import { StyleSheet, View, Text } from "react-native";
import { Input } from "./Input";
import { FunctionComponent, useState } from "react";
import { Button } from "../UI/Button";
import { Expense, ExpenseData } from "../../constants/types";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

type FormData = {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
};

type ExpenseFormProps = {
  onCancel: () => void;
  onSubmit: (data: ExpenseData) => void;
  submitBUttonLabel: string;
  defaultValue?: Expense;
};

export const ExpenseForm: FunctionComponent<ExpenseFormProps> = ({
  onCancel,
  onSubmit,
  submitBUttonLabel,
  defaultValue,
}) => {
  const [inputs, setInputs] = useState<FormData>({
    amount: {
      value: defaultValue?.amount.toString() || "",
      isValid: true,
    },
    date: {
      value: defaultValue?.date ? `${getFormattedDate(defaultValue.date)}` : "",
      isValid: true,
    },
    description: {
      value: defaultValue?.description || "",
      isValid: true,
    },
  });

  // const [errorLabel, setErrorLabel] = useState<string>("");

  const inputChangedHandler = (
    inputId: keyof FormData,
    enteredText: string
  ) => {
    setInputs((currInputs) => ({
      ...currInputs,
      [inputId]: { value: enteredText, isValid: true },
    }));
  };

  const submitHandler = () => {
    const expenseData: ExpenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValue = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValue) {
      setInputs((currInputs) => {
        const { amount, date, description } = currInputs;
        return {
          amount: { value: amount.value, isValid: amountIsValid },
          date: { value: date.value, isValid: dateIsValid },
          description: {
            value: description.value,
            isValid: descriptionIsValue,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          isValid={inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          containerStyle={styles.rowInput}
        />
        <Input
          label="Date"
          isValid={inputs.date.isValid}
          textInputConfig={{
            keyboardType: "default",
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          containerStyle={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        isValid={inputs.description.isValid}
        textInputConfig={{
          keyboardType: "default",
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />

      {formIsInvalid && (
        <Text style={styles.errorText}>Your form has an error</Text>
      )}

      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitBUttonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontSize: 16,
  },
});
