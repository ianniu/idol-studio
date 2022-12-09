import { View, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../styles/Styles'
import MusicItem from './MusicItem'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestore } from '../firebase/firebase-setup'
import { useDispatch, useSelector } from 'react-redux'
import { setTrack, setCurrentIdx, setCurrentMusic } from './Player/playerSlice'
import { selectPlaylists, setPlaylists } from './User/userSlice'

export default function PlaylistDetail({ route, navigation }) {
  const { playlist } = route.params
  const [songs, setSongs] = useState([])
  const playlists = useSelector(selectPlaylists)
  const dispatch = useDispatch()

  // get songs that are in this playlist
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'musics'), (querySnapshot) => {
      if (querySnapshot.empty) {
        setSongs([])
      } else {
        const playlistSongs = []
        for (
          let i = 0;
          i < querySnapshot.docs.length && playlistSongs.length < playlist.musicContent.length;
          i++
        ) {
          let snapDoc = querySnapshot.docs[i]
          let id = snapDoc.id
          if (playlist.musicContent.includes(id)) {
            playlistSongs.push({ ...snapDoc.data(), id: snapDoc.id })
          }
        }
        setSongs(playlistSongs)
      }
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    setSongs(playlist)
  }, [playlists])

  const onPressMusicItem = (item, index) => {
    dispatch(setTrack(songs))
    dispatch(setCurrentIdx(index))
    dispatch(setCurrentMusic(item))
  }

  return (
    <View style={styles.bottomContainer}>
      <FlatList
        data={songs}
        renderItem={({ item, index }) => (
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? Colors.greyTransparent : Colors.black1
              }
            ]}
            onPress={() => onPressMusicItem(item, index)}
          >
            <MusicItem item={item} />
          </Pressable>
        )}
        contentContainerStyle={styles.scrollViewItems}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black1,
    justifyContent: 'center'
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: Colors.black1
  },
  scrollViewItems: {
    alignItems: 'center'
  }
})
