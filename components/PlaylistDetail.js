import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Colors } from "../styles/Styles"
import MusicItem from "./MusicItem";

export default function PlaylistDetail({ route, navigation }) {
  return (
    <View style={styles.bottomContainer}>
      <FlatList
        data={route.params.listObject.music}
        renderItem={({ item }) => {
          return <MusicItem item={item} />
        }}
        ontentContainerStyle={styles.scrollViewItems}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black1,
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: Colors.black1,
  },
  scrollViewItems: {
    alignItems: "center",
  },
})