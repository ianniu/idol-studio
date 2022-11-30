import {
  View,
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
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  const [searchText, setSearchText] = useState()
  const [songs, setSongs] = useState([])
  const sound = useRef(new Audio.Sound())

  // get musics
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

  useEffect(() => {
    const configureAudio = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      })
    }
    configureAudio()
  }, [])

  const loadAudio = async () => {
    // await sound.current.loadAsync({
    //   uri: "https://firebasestorage.googleapis.com/v0/b/idol-studio.appspot.com/o/music%2F%E5%BF%BD%E7%84%B6.mp3?alt=media&token=e54fe3b1-9c78-43bf-9118-2660a75cc6fa",
    // })
    await sound.current.loadAsync(require("../assets/huran.mp3"))
  }

  const unloadAudio = async () => {
    await sound.current.unloadAsync()
  }

  // load and unload audio
  useEffect(() => {
    loadAudio()
    return () => unloadAudio()
  }, [])

  const playAudio = async () => {
    try {
      const status = await sound.current.getStatusAsync()
      if (status.isLoaded) {
        if (!status.isPlaying) {
          await sound.current.playAsync()
        }
      }
    } catch (e) {
      console.log("play audio failed: ", e)
    }
  }

  const pauseAudio = async () => {
    try {
      const status = await sound.current.getStatusAsync()
      if (status.isLoaded) {
        await sound.current.pauseAsync()
      }
    } catch (e) {
      console.log("pause audio error: ", e)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
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
