import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FunctionComponent } from "react";

type IconButtonProps = {
  icon: any;
  size: number;
  color: string;
  onPress: () => void;
};

export const IconButton: FunctionComponent<IconButtonProps> = ({
  icon,
  size,
  color,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
