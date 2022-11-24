import { View, Text, SafeAreaView, StyleSheet } from "react-native"
import React from "react"
import { Colors } from "../styles/Styles"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "./Home"
import Playlist from "./Playlist"
import { Ionicons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()

export default function Main() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline"
            } else if (route.name === "Playlist") {
              iconName = focused ? "list-circle" : "list-circle-outline"
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.grey1,
            borderColor: Colors.grey1,
          },
          tabBarActiveTintColor: Colors.white1,
          tabBarInactiveTintColor: Colors.white1,
        })}
      >
        <Tab.Screen name="Home" component={Home} options={({ route }) => {}} />
        <Tab.Screen name="Playlist" component={Playlist} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black1,
    flex: 1,
  },
})
