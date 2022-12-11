import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, SafeAreaView, FlatList, Button, Image, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import PlaylistItem from './PlaylistItem'
import { firestore, auth, storage  } from "../firebase/firebase-setup"
import { getPlaylistsFromDB } from '../firebase/firestore'
import { Colors } from '../styles/Styles'
import { onAuthStateChanged } from 'firebase/auth'
import {
  setPlaylists,
  selectPlaylists,
  selectAuthenticated,
  setAuthenticated
} from '../components/User/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { ref, getDownloadURL } from "firebase/storage"

export default function PlayList({ route, navigation }) {
  const [imageUri, setImageUri] = useState(
    'https://user-images.githubusercontent.com/67746875/204928445-af19dc91-ed83-4aae-9351-cd096b5bac67.png'
  )
  const dispatch = useDispatch()
  const playlists = useSelector(selectPlaylists)
  const authenticated = useSelector(selectAuthenticated)
  const [userPhoto, setUserPhoto] = useState()

  useEffect(() => {
    const q = query(collection(firestore, "photo"), where("user", "==", auth.currentUser.uid))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserPhoto(doc.data())
      })
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const getImageURL = async () => {
      try {
        if (userPhoto) {
          const reference = ref(storage, userPhoto.uri)
          const downloadImageURL = await getDownloadURL(reference)
          setImageUri(downloadImageURL)
        }
      } catch (err) {
        console.log("download image ", err)
      }
    }
    getImageURL()
  }, [userPhoto])

  function itemPressed(playlist) {
    navigation.navigate('PlaylistDetail', { playlist: playlist })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuthenticated(true))
      } else {
        dispatch(setAuthenticated(false))
      }
    })
  })

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        if (!authenticated) return
        const res = await getPlaylistsFromDB()
        dispatch(setPlaylists(res))
      } catch (e) {
        console.log('Get playlist error: ', e)
      }
    }
    getPlaylists()
  }, [authenticated])

  const login = () => {
    navigation.navigate('Login')
  }
  const signup = () => {
    navigation.navigate('Signup')
  }
  const gotoProfile = () => {
    navigation.navigate('Profile')
  }

  return (
    <SafeAreaView style={styles.container}>
      {authenticated ? (
        <>
          <Pressable onPress={gotoProfile}>
            <Image source={{ uri: imageUri }} style={{ borderRadius: 50, width: 100, height: 100 }} />
          </Pressable>
          <View style={styles.bottomContainer}>
            <FlatList
              data={playlists}
              renderItem={({ item }) => {
                return <PlaylistItem playlist={item} onItemPress={itemPressed} />
              }}
              contentContainerStyle={styles.scrollViewItems}
            ></FlatList>
          </View>
        </>
      ) : (
        <>
          <Button title="Log in to view your playlists" onPress={login} />
          <Button title="Don't have an account yet? Register Now!" onPress={signup} />
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
    justifyContent: 'center'
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: Colors.black1,
    marginTop: 20
  },
  scrollViewItems: {
    alignItems: 'center'
  }
})
