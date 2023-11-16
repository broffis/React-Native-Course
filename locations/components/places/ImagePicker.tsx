import { FunctionComponent, useState } from "react";
import { Alert, Button, Image, View, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  ImagePickerAsset,
  ImagePickerResult,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import { OutlinedButton } from "../ui/OutlinedButton";

type ImagePickerProps = {
  onTakeImage: (img: ImagePickerAsset) => void;
};
export const ImagePicker: FunctionComponent<ImagePickerProps> = ({
  onTakeImage,
}) => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState<ImagePickerAsset | null>(null);

  const verifyPermissions = async () => {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionRes = await requestPermission();
      return permissionRes.granted;
    }

    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );

      return false;
    }

    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const imageResult: ImagePickerResult = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    const [selectedImage] = imageResult?.assets ?? [];
    setPickedImage(selectedImage);
    onTakeImage(selectedImage);
  };

  let imagePreview = <Text>No image taken yet</Text>;
  if (pickedImage?.uri) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: pickedImage?.uri }} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={takeImageHandler} icon="camera">
        Take Image
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
