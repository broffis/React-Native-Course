import { Pressable, StyleSheet, View } from "react-native";
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
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => pressed && styles.pressed}
  >
    <View style={styles.buttonContainer}>
      <Ionicons name={icon} size={size} color={color} />
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
