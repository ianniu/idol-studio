import { StatusBar } from "expo-status-bar"
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Button,
  Image,
  Pressable,
} from "react-native"
import { useState, useEffect } from "react"
import PlaylistItem from "./PlaylistItem"
import { firestore, auth } from "../firebase/firebase-setup"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { Colors } from "../styles/Styles"
import { onAuthStateChanged } from "firebase/auth"

export default function PlayList({ route, navigation }) {
  const [imageUri, setImageUri] = useState(
    "https://user-images.githubusercontent.com/67746875/204928445-af19dc91-ed83-4aae-9351-cd096b5bac67.png"
  )
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const fakeData = [
    { text: "My favorite", music: [{ title: "Title", artist: "Artist" }] },
  ]
  const [music, setMusic] = useState([])
  // useEffect(() => {
  //   const q = route.params.isImportant?
  //     query(collection(firestore, "music"), where("isImportant", "==", true)):
  //     collection(firestore, "music");
  //   const unsubscribe = onSnapshot(
  //     q, (querySnapshot) => {
  //       if (querySnapshot.empty) {
  //         setMusic([]);
  //         return;
  //       }
  //       setMusic(
  //         querySnapshot.docs.map((snapDoc) => {
  //           let data = snapDoc.data();
  //           data = { ...data, key: snapDoc.id };
  //           return data;
  //         })
  //       );
  //     }
  //   );
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  function itemPressed(list) {
    navigation.navigate("PlaylistDetail", { listObject: list })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true)
      } else {
        setIsUserAuthenticated(false)
      }
    })
  })

  const login = () => {
    navigation.navigate("Login")
  }
  const signup = () => {
    navigation.navigate("Signup")
  }
  const gotoProfile = () => {
    navigation.navigate("Profile")
  }

  return (
    <SafeAreaView style={styles.container}>
      {isUserAuthenticated ? (
        <>
          <Pressable onPress={gotoProfile}>
            <Image
              source={{ uri: imageUri }}
              style={{ width: 100, height: 100 }}
            />
          </Pressable>
          <View style={styles.bottomContainer}>
            <FlatList
              data={fakeData}
              renderItem={({ item }) => {
                return <PlaylistItem music={item} onItemPress={itemPressed} />
              }}
              contentContainerStyle={styles.scrollViewItems}
            ></FlatList>
          </View>
        </>
      ) : (
        <>
          <Button title="Log in to view your playlists" onPress={login} />
          <Button
            title="Don't have an account yet? Register Now!"
            onPress={signup}
          />
        </>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black1,
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: Colors.black1,
    marginTop: 20,
  },
  scrollViewItems: {
    alignItems: "center",
  },
})
