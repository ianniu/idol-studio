import { Pressable, Text, StyleSheet } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications'
import { Colors } from '../styles/Styles'

const NotificationManager = () => {
  const verifyPermission = async () => {
    try {
      const permissionStatus = await Notifications.getPermissionsAsync()
      if (permissionStatus.granted) {
        return true
      } else {
        const requestPermissionStatus = await Notifications.requestPermissionsAsync({
          ios: { allowBadge: true }
        })
        return requestPermissionStatus
      }
    } catch (e) {
      console.log(e)
    }
  }

  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission()
      if (!hasPermission) return
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Time to have a rest',
          body: 'Maybe jump out of the music for one minute?'
        },
        trigger: {
          hour: 1
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Pressable
      onPress={() => scheduleNotificationHandler()}
      style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
    >
      <Text style={styles.text}>Rest after 1 hour</Text>
    </Pressable>
  )
}

export default NotificationManager

const styles = StyleSheet.create({
  text: {
    color: Colors.white1
  }
})
