import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import { useState, useEffect } from "react";
import MusicItem from "./MusicItem";
import { firestore } from '../firebase/firebase-setup';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Colors from '../styles/Colors';

export default function PlayList({ route, navigation }) {
  const fakeData = [{text: "Viva La Vida"}];
  const [music, setMusic] = useState([]);
  useEffect(() => {
    const q = route.params.isImportant? 
      query(collection(firestore, "music"), where("isImportant", "==", true)): 
      collection(firestore, "music");
    const unsubscribe = onSnapshot(
      q, (querySnapshot) => {
        if (querySnapshot.empty) {
          setMusic([]);
          return;
        }
        setMusic(
          querySnapshot.docs.map((snapDoc) => {
            let data = snapDoc.data();
            data = { ...data, key: snapDoc.id };
            return data;
          })
        );
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  function itemPressed(music) {
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomContainer}>
        <FlatList
          data={fakeData}
          renderItem={({ item }) => {
            return (
              <MusicItem
                music={item}
                onItemPress={itemPressed}
              />
            );
          }}
          contentContainerStyle={styles.scrollViewItems}
        ></FlatList>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: Colors.black,
  },
  scrollViewItems: {
    alignItems: "center",
  },
});