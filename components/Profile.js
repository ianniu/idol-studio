import { View, Image, StyleSheet, Button, Text } from "react-native"
import React, { useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { firestore, auth } from "../firebase/firebase-setup"
import { Colors } from "../styles/Styles"
import LocationManager from "./LocationManager"

export default function Profile({ navigation }) {
  const [permissionInfo, requestPermission] = ImagePicker.useCameraPermissions()
  const [imageUri, setImageUri] = useState(
    "https://user-images.githubusercontent.com/67746875/204928445-af19dc91-ed83-4aae-9351-cd096b5bac67.png"
  )
  const verifyPermission = async () => {
    if (permissionInfo.granted) {
      return true
    }
    const requestPermissionResponse = await requestPermission()
    return requestPermissionResponse.granted
  }
  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission()
      if (!hasPermission) {
        return
      }
      const result = await ImagePicker.launchCameraAsync()
      setImageUri(result.uri)
    } catch (err) {
      console.log("Image taking error ", err)
    }
  }

  const logout = () => {
    signOut(auth)
    navigation.navigate("Playlist")
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
      <Button title="Take an Image" onPress={takeImageHandler} />
      <Text style={styles.text}>{auth.currentUser.email}</Text>
      <LocationManager />
      <Button title="Log out" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.black1,
    justifyContent: "center",
  },
  text: {
    color: Colors.white1,
    fontSize: 24,
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: Colors.black1,
  },
  scrollViewItems: {
    alignItems: "center",
  },
})
