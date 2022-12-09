import { collection, addDoc, deleteDoc, updateDoc, doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, firestore } from './firebase-setup'

export const addPlaylistToDB = async (playlistData) => {
  try {
    await setDoc(
      doc(firestore, 'users', auth.currentUser.uid),
      { playlists: [playlistData] },
      { mergeFields: ['playlists'] }
    )
  } catch (e) {
    console.log('Add playlist to DB failed: ', e)
  }
}

export const getPlaylistsFromDB = async () => {
  try {
    const docSnap = await getDoc(doc(firestore, 'users', auth.currentUser.uid))
    if (docSnap.exists()) {
      return docSnap.data().playlists
    }
  } catch (e) {
    console.log(e)
  }
}

export const updatePlaylistsInDB = async (playlists) => {
  try {
    const userRef = doc(firestore, 'users', auth.currentUser.uid)
    await updateDoc(userRef, { playlists: playlists })
  } catch (e) {
    console.log(e)
  }
}
