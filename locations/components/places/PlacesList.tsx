import { FunctionComponent } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Place } from "../../models/place";
import { PlaceItem } from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

type PlacesListProps = {
  places: Place[];
};

export const PlacesList: FunctionComponent<PlacesListProps> = ({ places }) => {
  const { navigate } = useNavigation();

  const selectPlaceHandler = (id: string) => {
    navigate("PlaceDetails", { placeId: id });
  };
  if (places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places found. Maybe start adding some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
