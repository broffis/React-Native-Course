import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllPlaces } from "./screens/AllPlaces";
import { AddPlace } from "./screens/AddPlace";
import { IconButton } from "./components/ui/IconButton";
import { Colors } from "./constants/colors";
import { MapPicker } from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import { PlaceDetails } from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState<boolean>(false);
  useEffect(() => {
    init()
      .then(() => setDbInitialized(true))
      .catch((err) => console.log(err));
  }, []);

  if (!dbInitialized) {
    SplashScreen.hideAsync();
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  color={tintColor ?? ""}
                  size={24}
                  onPress={() => {
                    navigation.navigate("AddPlace");
                  }}
                  icon="add"
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: "Loading place...",
            }}
          />
          <Stack.Screen name="Map" component={MapPicker} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
