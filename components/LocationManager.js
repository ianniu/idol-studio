import { View, Text, Image, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location'
import { Colors } from "../styles/Styles"
import { mapAPIKey, weatherAPIKey } from "@env"

export default function LocationManager() {
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions()
  const [location, setLocation] = useState()
  const [weather, setWeather] = useState({})
  const [description, setDescription] = useState("--")

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
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}&exclude=hourly,minutely&units=metric&appid=${weatherAPIKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data.current)
          if (weather) {
            setDescription(weather.weather[0].description)
          }
        })
        .catch((err) => {
          console.log("error", err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View>
      <Button title='Locate Me and Show Weather' onPress={locateUserHandler}/>
      {location && (
        <>
          <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapAPIKey}` }} style={{ width: 300, height: 200 }} />
          <Text style={styles.text}>Temperature: {weather.temp}°C</Text>
          <Text style={styles.text}>Weather: {description}</Text>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: Colors.white1,
    fontSize: 24,
    textAlign: "center",
  },
})