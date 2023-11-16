import { FunctionComponent, useEffect, useState } from "react";
import { PlacesList } from "../components/places/PlacesList";
import { Route, useIsFocused } from "@react-navigation/native";
import { Place } from "../models/place";
import { fetchPlaces } from "../util/database";

type AllPlacesParams = {
  place: Place;
};

type AllPlacesProps = {
  route: Route<"AllPlaces", AllPlacesParams>;
};

export const AllPlaces: FunctionComponent<AllPlacesProps> = ({ route }) => {
  const [places, setPlaces] = useState<Place[]>([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    // if (isFocused && route.params) {
    //   setPlaces((curPlaces) => [...curPlaces, route.params.place]);
    // }
    async function loadPlaces() {
      const places = await fetchPlaces();
      setPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);
  return <PlacesList places={places} />;
};
