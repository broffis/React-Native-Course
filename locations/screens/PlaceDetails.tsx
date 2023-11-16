import { FunctionComponent, useEffect, useState } from "react";
import { Image, Text, ScrollView, View, StyleSheet } from "react-native";
import { OutlinedButton } from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { NavigationProp, Route } from "@react-navigation/native";
import { fetchPlace } from "../util/database";
import { Place } from "../models/place";

export type PlaceDetailsParams = {
  placeId: string;
};

type PlaceDetailsProps = {
  route: Route<"PlaceDetails", PlaceDetailsParams>;
  // TODO: Figure out typing on this
  navigation: NavigationProp<any>;
};
export const PlaceDetails: FunctionComponent<PlaceDetailsProps> = ({
  route,
  navigation,
}) => {
  const [place, setPlace] = useState<Place | null>(null);
  const showMapHandler = () => {
    if (place) {
      navigation.navigate("Map", {
        lat: place?.location.lat,
        lng: place?.location.lng,
      });
    }
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    // use selected place id to fetch data
    async function fetchFromDb() {
      const place = await fetchPlace(selectedPlaceId);
      setPlace(place);
      navigation.setOptions({ title: place.title });
    }

    if (selectedPlaceId) {
      fetchFromDb();
    }
  }, [selectedPlaceId]);

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place?.location.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
