import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Colors from '../styles/Colors';

export default function MusicItem({ music, onItemPress }) {
  return (
    <View style={styles.musicTextContainer}>
      <Pressable
        onPress={() => {
          onItemPress(music);
        }}
        android_ripple={{ color: Colors.ripple, foreground: true }}
        style={(obj) => {
          return obj.pressed && styles.pressedItem;
        }}
      >
        <View style={styles.musicWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.musicText}> {music.text} </Text>
          </View>
          <View style={styles.numberWrapper}>
            <Text style={styles.musicAmount}></Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  musicTextContainer: {
    margin: 8,
    borderRadius: 5,
    backgroundColor: Colors.lightBlack,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textWrapper: {
    flex: 3,
  },
  musicText: {
    fontSize: 18,
    color: Colors.white,
    padding: 12,
  },
  numberWrapper: {
    flex: 1,
    backgroundColor: Colors.lightBlack,
    margin: 3,
    borderRadius: 5,
  },
  musicAmount: {
    fontSize: 18,
    color: Colors.white,
    padding: 12,
    textAlign: 'center',
  },
  pressedItem: {
    backgroundColor: Colors.pressed,
    opacity: 0.5,
    borderRadius: 5,
  },
  musicWrapper: {
    flexDirection: 'row',
    width: 350,
  },
});