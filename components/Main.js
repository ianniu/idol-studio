import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '../styles/Styles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import Playlist from './Playlist'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Player from './Player/Player'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import PlaylistDetail from './PlaylistDetail'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
const HEIGHT = Dimensions.get('window').height

const StackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Playlist">
      <Stack.Screen
        name="Playlist"
        component={Playlist}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: { backgroundColor: Colors.black1 },
          headerTintColor: Colors.white1,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerStyle: { backgroundColor: Colors.black1 },
          headerTintColor: Colors.white1,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: { backgroundColor: Colors.black1 },
          headerTintColor: Colors.white1,
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="PlaylistDetail"
        component={PlaylistDetail}
        options={({ route }) => {
          return {
            title: route.params.listObject.text,
            headerStyle: { backgroundColor: Colors.black1 },
            headerTintColor: Colors.white1,
            headerTitleAlign: 'center'
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default function Main() {
  const insets = useSafeAreaInsets()
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Other') {
              iconName = focused ? 'list-circle' : 'list-circle-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.grey1,
            borderColor: Colors.grey1
          },
          tabBarActiveTintColor: Colors.white1,
          tabBarInactiveTintColor: Colors.white1
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Other" component={StackScreen} />
      </Tab.Navigator>
      <View
        style={{
          position: 'absolute',
          transform: [{ translateY: HEIGHT - (insets.bottom + insets.top) - 89 }]
        }}
      >
        <Player />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black1,
    flex: 1
  }
})
