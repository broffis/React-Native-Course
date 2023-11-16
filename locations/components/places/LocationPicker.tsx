import { FunctionComponent, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import { OutlinedButton } from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import { Address, Location } from "../../constants/types";
import { getAddress, getMapPreview } from "../../util/location";
import {
  Route,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

type LocationPickerProps = {
  onTakeLocation: (location: Address) => void;
};

type LocationPickerRouteParams = {
  pickedLocation?: Location;
};
export const LocationPicker: FunctionComponent<LocationPickerProps> = ({
  onTakeLocation,
}) => {
  const [pickedLocation, setPickedLocation] = useState<Location | null>(null);
  const isFocused = useIsFocused();

  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const navigate = useNavigation();
  const route = useRoute<RouteProp<LocationPickerRouteParams>>();

  useEffect(() => {
    if (isFocused && route.params) {
      const { lat, lng } = route.params;
      const mapPickedLocation = {
        lat,
        lng,
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        console.log({ pickedLocation });
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        console.log({ address });
        onTakeLocation({ ...pickedLocation, address });
      }
    }

    handleLocation();
  }, [pickedLocation, onTakeLocation]);

  const verifyPermissions = async () => {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionRes = await requestPermission();
      return permissionRes.granted;
    }

    if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );

      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }

    const {
      coords: { latitude, longitude },
    } = await getCurrentPositionAsync();

    setPickedLocation({
      lat: latitude,
      lng: longitude,
    });
  };

  const pickOnMapHandler = () => {
    // TODO: Figure out how to type this
    navigate.navigate("Map");
  };

  let locationPreview = <Text>No location chosen yet!</Text>;

  if (pickedLocation !== null) {
    // console.log(getMapPreview(pickedLocation));
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate user
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
