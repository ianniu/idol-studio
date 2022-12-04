import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { Colors, StandardWidth } from '../styles/Styles'
import { Ionicons, Feather } from '@expo/vector-icons'

export default function MusicItem(props) {
  const { item } = props

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
      <View style={styles.iconsWrapper}>
        <Pressable>
          <Ionicons name="heart-outline" size={24} color={Colors.white1} />
        </Pressable>
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
