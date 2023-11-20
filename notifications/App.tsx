import { Alert, Button, StyleSheet, Text, View, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of the notification",
        data: { userName: "Max" },
      },
      trigger: {
        seconds: 3,
      },
    });
  };

  useEffect(() => {
    const configurePushNotifications = async () => {
      console.log("start");
      const { status } = await Notifications.getPermissionsAsync();

      console.log("getPermissionsAsync", status);
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status: requestedStatus } =
          await Notifications.requestPermissionsAsync();
        console.log("requestPermissionsAsync", requestedStatus);
        finalStatus = requestedStatus;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required!",
          "Push notifications need the appropriate permissions.",
          [{ text: "Okay" }]
        );
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      }).catch((err) => {
        console.log(err);
      });
      console.log(pushTokenData);
    };

    configurePushNotifications();

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
  }, []);

  useEffect(() => {
    // Fires whether or not there is an interaction
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("notification received");
        const { userName } = notification.request.content.data;
        console.log(userName);
      }
    );

    // Fires when the notification is interacted with
    const interactionSubscription =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        console.log("notification response received");
        console.log({ ...notification.notification.request.content });
      });

    return () => {
      receivedSubscription.remove();
      interactionSubscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Button
        title="Schedule notification"
        onPress={scheduleNotificationHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
