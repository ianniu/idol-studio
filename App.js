import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Main from "./components/Main"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Profile from "./components/Profile"
import PlaylistDetail from "./components/PlaylistDetail"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { Colors } from "./styles/Styles"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}
