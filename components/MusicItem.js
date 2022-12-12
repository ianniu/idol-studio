import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors, StandardWidth } from '../styles/Styles'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { selectPlaylists, setPlaylists } from './User/userSlice'
import { updatePlaylistsInDB, getPlaylistsFromDB } from '../firebase/firestore'

export default function MusicItem(props) {
  const { item } = props
  const playlists = useSelector(selectPlaylists)
  const [isFavorite, setIsFavorite] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (playlists && playlists[0] && playlists[0].musicContent) {
      setIsFavorite(playlists[0].musicContent.includes(item.id))
    }
  }, [playlists])

  const addSongToFavorite = async () => {
    try {
      if (!playlists || !playlists.length || !playlists[0]) return
      const newFavoritePlaylist = {
        ...playlists[0],
        musicContent: [...playlists[0].musicContent, item.id]
      }
      const newPlaylists = [...playlists]
      newPlaylists.splice(0, 1, newFavoritePlaylist)
      await updatePlaylistsInDB(newPlaylists)
      const res = await getPlaylistsFromDB()
      dispatch(setPlaylists(res))
    } catch (e) {
      console.log('add song to favorite error: ', e)
    }
  }

  const removeSongFromFavorite = async () => {
    try {
      if (!playlists || !playlists.length || !playlists[0]) return
      const removeIdx = playlists[0].musicContent.findIndex((element) => element === item.id)
      const newMusicContent = [...playlists[0].musicContent]
      newMusicContent.splice(removeIdx, 1)
      const newFavoritePlaylist = {
        ...playlists[0],
        musicContent: newMusicContent
      }
      const newPlaylists = [...playlists]
      newPlaylists.splice(0, 1, newFavoritePlaylist)
      await updatePlaylistsInDB(newPlaylists)
      const res = await getPlaylistsFromDB()
      dispatch(setPlaylists(res))
    } catch (e) {
      console.log('remove song from favorite error: ', e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
      <View style={styles.iconsWrapper}>
        {isFavorite && (
          <Pressable onPress={removeSongFromFavorite}>
            <Ionicons name="heart" size={24} color={Colors.pink1} />
          </Pressable>
        )}
        {!isFavorite && (
          <Pressable onPress={addSongToFavorite}>
            <Ionicons name="heart-outline" size={24} color={Colors.white1} />
          </Pressable>
        )}
        <Pressable style={{ marginLeft: 30 }}>
          <Feather name="plus" size={24} color={Colors.white1} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: StandardWidth,
    alignItems: 'center'
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    color: Colors.white1,
    fontSize: 24,
    fontWeight: '600'
  },
  artist: {
    color: Colors.white1,
    fontSize: 20,
    fontWeight: '300'
  },
  iconsWrapper: {
    display: 'flex',
    flexDirection: 'row'
  }
})
