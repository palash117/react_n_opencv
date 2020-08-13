import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
// import { CvCamera } from "react-native-opencv3";

const CustomImagePicker = () => {
  const [pickedImage, setpickedImage] = useState();
  console.log("pickedImage", pickedImage);
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
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

    const image = await ImagePicker.launchCameraAsync({
      // allowsEditing:true,
    });

    // console.log(image)
    setpickedImage(image.uri);
  };
  //   const opencvImageHandler = async () => {
  //     const { uri, width, height } = await this.cvCamera.takePicture(
  //       "myimage.jpg"
  //     );
  //     this.setpickedImage("file://" + uri);
  //   };
  return (
    <View style={styles.container}>
      {!pickedImage ? (
        <Text style={styles.defaultText}>No Image picked yet</Text>
      ) : (
        <Image style={styles.image} source={{ uri: pickedImage }} />
      )}
      {/* <CvCamera
        ref={(ref) => {
          this.cvCamera = ref;
        }}
        style={styles.preview}
        facing={facing}
        useStorage={true}
      /> */}
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

export default CustomImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultText: {
    textAlign: "center",
  },
  image: {
    height: 300,
    width: 300,
  },
});
