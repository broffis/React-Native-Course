import { View, Text, StyleSheet } from "react-native";
function SubTitle({ text }) {
  return (
    <View style={styles.subTitleContainer}>
      <Text style={styles.subTitle}>{text}</Text>
    </View>
  );
}

export default SubTitle;

const styles = StyleSheet.create({
  subTitle: {
    color: "#e2b497",
    fontSize: 18,
    fontWeight: "bold",

    textAlign: "center",
  },
  subTitleContainer: {
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
  },
});
