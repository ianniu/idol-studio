import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native"
import React from "react"
import { Colors } from "../styles/Styles"
import { Ionicons, Feather } from "@expo/vector-icons"

const WIDTH = Dimensions.get("window").width

export default function MusicItem(props) {
  const { item } = props

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: pressed ? Colors.greyTransparent : Colors.black1 },
      ]}
    >
      <View style={styles.textWrapper}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.singer}>{item.singer}</Text>
      </View>
      <View style={styles.iconsWrapper}>
        <Pressable>
          <Ionicons name="heart-outline" size={24} color={Colors.white1} />
        </Pressable>
        <Pressable style={{ marginLeft: 30 }}>
          <Feather name="plus" size={24} color={Colors.white1} />
        </Pressable>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    minHeight: 80,
    backgroundColor: Colors.grey1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: Math.floor(WIDTH) - 10,
    alignItems: "center",
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    color: Colors.white1,
    fontSize: 24,
    fontWeight: "600",
  },
  singer: {
    color: Colors.white1,
    fontSize: 20,
    fontWeight: "300",
  },
  iconsWrapper: {
    display: "flex",
    flexDirection: "row",
  },
})
