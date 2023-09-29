import { StyleSheet, Text, Platform } from "react-native";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    // borderWith: Platform.OS === 'ios' ? 0 : 2,
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
  },
});
