import { OpaqueColorValue, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FunctionComponent } from "react";

type IconButtonProps = {
  icon: any;
  color: string | OpaqueColorValue;
  size: number;
  onPress: () => void;
};

const IconButton: FunctionComponent<IconButtonProps> = ({
  icon,
  color,
  size,
  onPress,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
