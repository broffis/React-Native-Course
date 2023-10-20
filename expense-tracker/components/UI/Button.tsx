import { FunctionComponent } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

type ButtonProps = {
  onPress: () => void;
  mode?: "primary" | "flat";
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onPress,
  mode,
  style,
}) => (
  <View style={style}>
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.button, mode === "flat" && styles.flat]}>
        <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
          {children}
        </Text>
      </View>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
