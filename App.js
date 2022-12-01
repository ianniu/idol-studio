import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Main from "./components/Main"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Profile from "./components/Profile"
import PlaylistDetail from "./components/PlaylistDetail"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Colors } from "./styles/Styles"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ 
              headerStyle: { backgroundColor: Colors.black1 },
              headerTintColor: Colors.white1,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ 
              headerStyle: { backgroundColor: Colors.black1 },
              headerTintColor: Colors.white1,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ 
              headerStyle: { backgroundColor: Colors.black1 },
              headerTintColor: Colors.white1,
              headerTitleAlign: "center",
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
                headerTitleAlign: "center",
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
