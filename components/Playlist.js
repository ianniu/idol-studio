import { StatusBar } from "expo-status-bar"
import { StyleSheet, View, SafeAreaView, FlatList, Button, Text } from "react-native"
import { useState, useEffect } from "react"
import PlaylistItem from "./PlaylistItem"
import { firestore, auth } from "../firebase/firebase-setup"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { Colors } from "../styles/Styles"
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function PlayList({ route, navigation }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const fakeData = [{ text: "Viva La Vida" }]
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

  function itemPressed(music) {}

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  });

  const login = () => {
    navigation.navigate("Login");
  }
  const signup = () => {
    navigation.navigate("Signup");
  }

  console.log(isUserAuthenticated)
  
  return (
    <SafeAreaView style={styles.container}>
      
      {isUserAuthenticated ? (
        <>
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
          <Button title="Log in to view your playlists" onPress={login}/>
          <Button title="Don't have an account yet? Register Now!" onPress={signup}/>
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
  },
  scrollViewItems: {
    alignItems: "center",
  },
})