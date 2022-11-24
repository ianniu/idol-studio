import { collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase-setup";

export async function writeToDB(goal) {
  try {
    const docRef = await addDoc(collection(firestore, "expenses"), goal);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(key) {
  try {
    await deleteDoc(doc(firestore, "expenses", key));
  } catch (err) {
    console.log(err);
  }
}

export async function updateDB(key) {
  try {
    await updateDoc(doc(firestore, "expenses", key), { isImportant: true });
  } catch (err) {
    console.log(err);
  }
}

export async function updateDB2(key) {
  try {
    await updateDoc(doc(firestore, "expenses", key), { isImportant: false });
  } catch (err) {
    console.log(err);
  }
}