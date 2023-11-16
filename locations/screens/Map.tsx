import React, {
  FunctionComponent,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { Location } from "../constants/types";
import { NavigationProp, Route } from "@react-navigation/native";
import { IconButton } from "../components/ui/IconButton";

type MapPickerProps = {
  // TODO: Figure out how to type this correctly so the call to navigation.navigate can take params
  // navigation: NavigationProp<ReactNavigation.RootParamList>;
  navigation: NavigationProp<any>;
  route: Route<"Map", { lat?: number; lng?: number }>;
};

export const MapPicker: FunctionComponent<MapPickerProps> = ({
  navigation,
  route,
}) => {
  let initialLocation =
    route.params?.lat && route.params.lng
      ? {
          lat: route.params.lat,
          lng: route.params.lng,
        }
      : undefined;

  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You must pick a location by tapping on the map, first"
      );
      return;
    }

    navigation.navigate("AddPlace", { ...selectedLocation });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }: { tintColor: string }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
