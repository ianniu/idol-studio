import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExpenseList from "./components/PlayList";
import Colors from './styles/Colors';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function MainMenu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: Colors.lightBlack },
        headerTintColor: Colors.white,
        tabBarStyle: { backgroundColor: Colors.lightBlack },
        tabBarTintColor: Colors.white,
        tabBarTitleAlign: "center",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'All Expenses') {
            iconName = 'pricetag';
          } else if (route.name === 'Important Expenses') {
            iconName = 'card';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.white,
      })}
    >
      <Tab.Screen 
        name="Play List" 
        component={ExpenseList} 
        initialParams={{isImportant: false}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.darkPurple },
          headerTintColor: Colors.white,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={MainMenu}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 25,
    color: Colors.white,
    padding: 8,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  pressedItem: {
    backgroundColor: Colors.pressed,
    opacity: 0.5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: Colors.darkPurple,
    borderRadius: 5,
    marginRight: 15,
  },
});