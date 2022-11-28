import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native"
import React, { useState, useEffect } from "react"
import { Colors } from "../styles/Styles"
import { Ionicons } from "@expo/vector-icons"
import MusicItem from "./MusicItem"
import { collection, onSnapshot } from "firebase/firestore"
import { firestore } from "../firebase/firebase-setup"

export default function Home() {
  const [searchText, setSearchText] = useState()
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "musics"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setSongs([])
        } else {
          setSongs(
            querySnapshot.docs.map((snapDoc) => {
              let data = snapDoc.data()
              data = { ...data, id: snapDoc.id }
              return data
            })
          )
        }
      }
    )

    return unsubscribe
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput style={styles.searchInput} onChangeText={setSearchText} />
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.7 : 1 },
            styles.searchPressable,
          ]}
        >
          <Ionicons name="search" size={22} color={Colors.white1} />
        </Pressable>
      </View>
      <View style={styles.musicListWrapper}>
        <FlatList
          data={songs}
          renderItem={(item, index, separators) => (
            <MusicItem item={item.item} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black1,
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  searchWrapper: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 340,
    backgroundColor: Colors.grey1,
    borderRadius: 12,
    height: 42,
  },
  searchInput: {
    backgroundColor: Colors.grey1,
    borderRadius: 12,
    flex: 1,
    paddingHorizontal: 10,
    color: Colors.white1,
    fontSize: 22,
  },
  searchPressable: {
    padding: 10,
  },
  musicListWrapper: {
    marginTop: 40,
    flex: 1,
    display: "flex",
  },
})
