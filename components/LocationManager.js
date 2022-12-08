import { View, Text, Image, Button } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'

export default function LocationManager() {
  const navigation = useNavigation()
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions()
  const [location, setLocation] = useState()

  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true
    }
    const requestPermissionResponse = await requestPermission()
    return requestPermissionResponse.granted
  }

  const locateUserHandler = async () => {
    try {
      const hasPermission = await verifyPermission()
      if (!hasPermission) {
        return
      }
      const currentLocation = await Location.getCurrentPositionAsync()
      setLocation({latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude})
      console.log(location)
    } catch (err) {
      console.log(err)
    }
  }
  

  return (
    <View>
      <Button title='Locate me' onPress={locateUserHandler}/>
      {/* <Button title='Show map' onPress={() => {navigation.navigate("Map")}}/> */}
      {location && (
        <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=AIzaSyCuTiaiV7nKhvmsEb0ozA7zF9KaNEH5d30` }} style={{ width: 300, height: 200 }} />
      )}
      {/* <Button title='save location' onPress={saveUserLocation}/> */}
    </View>
  )
}