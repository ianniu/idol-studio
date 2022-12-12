import { View, Image, StyleSheet, Button, Text, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { firestore, auth, storage } from '../firebase/firebase-setup'
import { Colors } from '../styles/Styles'
import LocationManager from './LocationManager'
import { writePhotoToDB, updatePhotoInDB } from '../firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

export default function Profile({ navigation }) {
  const [permissionInfo, requestPermission] = ImagePicker.useCameraPermissions()
  const [imageUri, setImageUri] = useState(
    'https://user-images.githubusercontent.com/67746875/204928445-af19dc91-ed83-4aae-9351-cd096b5bac67.png'
  )
  const [userPhoto, setUserPhoto] = useState()

  useEffect(() => {
    const q = query(collection(firestore, 'photo'), where('user', '==', auth.currentUser.uid))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserPhoto({ ...doc.data(), key: doc.id })
      })
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const getImageURL = async () => {
      try {
        if (userPhoto) {
          const reference = ref(storage, userPhoto.uri)
          const downloadImageURL = await getDownloadURL(reference)
          setImageUri(downloadImageURL)
        }
      } catch (err) {
        console.log('download image ', err)
      }
    }
    getImageURL()
  }, [userPhoto])

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
      setImageUri(result.assets[0].uri)
    } catch (err) {
      console.log('Image taking error ', err)
    }
  }
  const uploadHandler = async () => {
    await uploadImage(imageUri)
    Alert.alert('Profile Picture Set')
  }

  const getImage = async (uri) => {
    try {
      const response = await fetch(uri)
      const blob = await response.blob()
      return blob
    } catch (err) {
      console.log('fetch image ', err)
    }
  }
  const uploadImage = async function (uri) {
    try {
      if (uri) {
        const imageBlob = await getImage(uri)
        const imageName = uri.substring(uri.lastIndexOf('/') + 1)
        const imageRef = ref(storage, `images/${imageName}`)
        const uploadResult = await uploadBytes(imageRef, imageBlob)
        uri = uploadResult.metadata.fullPath
      }
      const newObj = { uri: uri }
      if (userPhoto) {
        await updatePhotoInDB(newObj, userPhoto.key)
      } else {
        await writePhotoToDB(newObj)
      }
    } catch (err) {
      console.log('image upload ', err)
    }
  }

  const logout = () => {
    signOut(auth)
    navigation.navigate('Playlist')
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={{ borderRadius: 50, width: 100, height: 100 }} />
      <Button title="Take an Picture" onPress={takeImageHandler} />
      <Button title="Set as Profile Picture" onPress={uploadHandler} />
      <Text style={styles.text}>{auth.currentUser.email}</Text>
      <LocationManager />
      <Button title="Log out" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.black1,
    justifyContent: 'center'
  },
  text: {
    color: Colors.white1,
    fontSize: 24
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: Colors.black1
  },
  scrollViewItems: {
    alignItems: 'center'
  }
})
