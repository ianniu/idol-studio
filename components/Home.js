import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Button,
} from "react-native"
import React, { useState, useEffect, useRef } from "react"
import { Colors } from "../styles/Styles"
import { Ionicons } from "@expo/vector-icons"
import MusicItem from "./MusicItem"
import { collection, onSnapshot } from "firebase/firestore"
import { firestore } from "../firebase/firebase-setup"
import { Audio } from "expo-av"

export default function Home() {
  const [searchText, setSearchText] = useState()
  const [songs, setSongs] = useState([])
  // const sound = useRef(new Audio.Sound())

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

  // const loadAudio = async () => {
  //   // sound.current.loadAsync({
  //   //   uri: "https://firebasestorage.googleapis.com/v0/b/idol-studio.appspot.com/o/music%2F%E5%BF%BD%E7%84%B6.mp3?alt=media&token=e54fe3b1-9c78-43bf-9118-2660a75cc6fa",
  //   // })
  //   await sound.current.loadAsync(require("../assets/huran.mp3"), {
  //     shouldPlay: true,
  //   })
  // }

  // const unloadAudio = async () => {
  //   await sound.current.unloadAsync()
  // }

  // useEffect(() => {
  //   loadAudio()
  //   return () => unloadAudio()
  // }, [])

  // const playAudio = async () => {
  //   try {
  //     const result = await sound.current.getStatusAsync()
  //     console.log("status: ", result)
  //     if (result.isLoaded) {
  //       await sound.current.playAsync()
  //       const newStatus = await sound.current.getStatusAsync()
  //       console.log("isPlaying: ", newStatus.isPlaying)
  //     }
  //   } catch (e) {
  //     console.log("play audio failed: ", e)
  //   }
  // }

  const playAudio = async () => {
    try {
      const sound = new Audio.Sound()
      await sound.loadAsync(require("../assets/huran.mp3"))
      await sound.playAsync()
    } catch (e) {
      console.log("play audio error: ", e)
    }
  }

  const pauseAudio = async () => {
    // try {
    //   const result = await sound.current.getStatusAsync()
    //   if (result.isLoaded) {
    //     await sound.current.pauseAsync()
    //     const newStatus = await sound.current.getStatusAsync()
    //     console.log("isPlaying: ", newStatus.isPlaying)
    //   }
    // } catch (e) {
    //   console.log("pause audio error: ", e)
    // }
  }

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
        <Button title="play audio" onPress={playAudio} />
        <Button title="pause audio" onPress={pauseAudio} />
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
