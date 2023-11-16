import { FunctionComponent, useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { ImagePicker } from "./ImagePicker";
import { LocationPicker } from "./LocationPicker";
import { Button } from "../ui/Button";
import { ImagePickerAsset } from "expo-image-picker";
import { Address } from "../../constants/types";
import { Place } from "../../models/place";

type PlaceFormProps = {
  onCreatePlace: (place: Place) => void;
};

export const PlaceForm: FunctionComponent<PlaceFormProps> = ({
  onCreatePlace,
}) => {
  const [title, setTitle] = useState<string>("");
  const [pickedLocation, setPickedLocation] = useState<Address | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImagePickerAsset | null>(
    null
  );

  const changeTitleHandler = (text: string) => {
    setTitle(text);
  };

  const savePlaceHandler = () => {
    if (title && selectedImage && pickedLocation) {
      const placeData = new Place(title, selectedImage.uri, pickedLocation, "");

      onCreatePlace(placeData);
    }
  };

  const takeImageHandler = (img: ImagePickerAsset) => {
    setSelectedImage(img);
  };
  const takeLocationHandler = useCallback((location: Address) => {
    console.log({ location });
    setPickedLocation(location);
  }, []);

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={title}
          placeholder="Name this location"
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onTakeLocation={takeLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
});
