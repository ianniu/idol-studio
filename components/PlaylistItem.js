import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../styles/Styles'

export default function PlaylistItem({ playlist, onItemPress }) {
  return (
    <View style={styles.playlistTextContainer}>
      <Pressable
        onPress={() => {
          onItemPress(playlist)
        }}
        android_ripple={{ color: Colors.ripple, foreground: true }}
        style={(obj) => {
          return obj.pressed && styles.pressedItem
        }}
      >
        <View style={styles.playlistWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.playlistText}>{` ${playlist.name}`}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  playlistTextContainer: {
    margin: 8,
    borderRadius: 5,
    backgroundColor: Colors.grey1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textWrapper: {
    flex: 3
  },
  playlistText: {
    fontSize: 18,
    color: Colors.white1,
    padding: 12
  },
  pressedItem: {
    backgroundColor: Colors.greyTransparent,
    opacity: 0.5,
    borderRadius: 5
  },
  playlistWrapper: {
    flexDirection: 'row',
    width: 350
  }
})
