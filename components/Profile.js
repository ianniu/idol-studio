import { View, Image, Button, Text } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firestore, auth } from "../firebase/firebase-setup"

export default function Profile({ imageHandler }) {
  const [permissionInfo, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("https://user-images.githubusercontent.com/67746875/204928445-af19dc91-ed83-4aae-9351-cd096b5bac67.png");
  const verifyPermission = async () => {
    if (permissionInfo.granted) {
      return true;
    }
    const requestPermissionResponse = await requestPermission();
    return requestPermissionResponse.granted;
  };
  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        return;
      }
      const result = await ImagePicker.launchCameraAsync();
      // if (!result.canceled) {setImageUri(result.assets[0].uri)}
      setImageUri(result.uri);
      imageHandler(result.uri);
    } catch (err) {
      console.log("Image taking error ", err);
    }
  };
  return (
    <View>
      <Image source={{ uri: imageUri }} style={{ width: 80, height: 80 }} />
      <Button title="Take an Image" onPress={takeImageHandler} />
      <Text>{auth.currentUser.email}</Text>
      <Button title="Log out" onPress={() => {logOut(auth)}}/>
    </View>
  );
}
