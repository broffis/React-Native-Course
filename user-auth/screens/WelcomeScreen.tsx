import axios from "axios";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

const WelcomeScreen: FunctionComponent = () => {
  const { token } = useContext(AuthContext);
  const [fetchedMessage, setFetchedMessage] = useState<string>("");
  useEffect(() => {
    axios
      .get(
        `https://react-native-user-auth-564fa-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((response) => {
        setFetchedMessage(response.data);
      });
  }, []);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
