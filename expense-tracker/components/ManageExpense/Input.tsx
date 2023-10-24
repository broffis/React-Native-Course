import { FunctionComponent } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

type InputProps = {
  label: string;
  textInputConfig?: TextInputProps;
  containerStyle?: StyleProp<ViewStyle>;
  isValid?: boolean;
};

export const Input: FunctionComponent<InputProps> = ({
  label,
  textInputConfig,
  containerStyle,
  isValid,
}) => {
  const inputStyles: StyleProp<TextStyle>[] = [styles.input];
  if (textInputConfig?.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (!isValid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12, // Default is 14
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
