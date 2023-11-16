import { FunctionComponent } from "react";
import { PlaceForm } from "../components/places/PlaceForm";
import { NavigationProp } from "@react-navigation/native";
import { Place } from "../models/place";
import { insertPlace } from "../util/database";

type AddPlaceProps = {
  // TODO: Figure out typing on this
  navigation: NavigationProp<any>;
};

export const AddPlace: FunctionComponent<AddPlaceProps> = ({ navigation }) => {
  const createPlaceHandler = async (place: Place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces", { place });
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};
