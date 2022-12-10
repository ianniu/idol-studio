import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore"
import { firestore, auth } from "./firebase-setup";

export async function writeToDB(photo) {
  try {
    const docRef = await addDoc(collection(firestore, "photo"), {
      ...photo,
      user: auth.currentUser.uid,
    });
  } catch (err) {
    console.log(err);
  }
}
