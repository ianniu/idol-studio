import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../../styles/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectIsPlaying,
  selectCurrentMusic,
  play,
  pause,
  playNext,
  playPrevious,
  setCurrentProgress,
  selectIsLooping
} from './playerSlice'
import { Audio } from 'expo-av'
import PlayerModal from './PlayerModal'

const WIDTH = Dimensions.get('window').width

const Player = () => {
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const isPlaying = useSelector(selectIsPlaying)
  const currentMusic = useSelector(selectCurrentMusic)
  const isLooping = useSelector(selectIsLooping)
  const dispatch = useDispatch()
  const sound = useRef(new Audio.Sound())

  useEffect(() => {
    const configureAudio = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true
      })
    }
    configureAudio()
  }, [])

  const unloadAudio = async () => {
    await sound.current.unloadAsync()
  }

  const loadMusicAndPlay = async () => {
    if (!currentMusic || !currentMusic.url) return
    await sound.current.loadAsync(
      {
        uri: currentMusic.url
      },
      { progressUpdateIntervalMillis: 50 }
    )
    playAudio()
  }

  useEffect(() => {
    loadMusicAndPlay()
    return () => unloadAudio()
  }, [currentMusic])

  const _onPlayStatusUpdate = (soundStatus) => {
    if (!soundStatus.isLoaded) {
      if (soundStatus.error) {
        console.log(`Encountered an error during playback: ${soundStatus.error}`)
      }
      return
    } else {
      if (soundStatus.isPlaying && !isPlaying) {
        // isPlaying from redux store controls the UI, soundStatus.isPlaying is the actual status
        // If the soundStatus.isPlaying is true (means the sound is actually playing right now),
        // but the isPlaying from redux store is not true (means the UI is not updated),
        // we update UI by dispatch an action
        dispatch(play())
      } else if (!soundStatus.isPlaying && isPlaying) {
        // update UI
        dispatch(pause())
      }

      if (soundStatus.isPlaying) {
        dispatch(setCurrentProgress(soundStatus.positionMillis / 1000))
      }

      if (soundStatus.isBuffering) {
        // TBD
      }

      if (soundStatus.didJustFinish && !soundStatus.isLooping) {
        // play the next song in the track
        playNextAudio()
      }
    }
  }

  sound.current.setOnPlaybackStatusUpdate(_onPlayStatusUpdate)

  const playAudio = async () => {
    try {
      const status = await sound.current.getStatusAsync()
      if (status.isLoaded) {
        if (!status.isBuffering && !status.isPlaying) {
          await sound.current.playAsync()
        }
      }
    } catch (e) {
      console.log('Play audio failed: ', e)
    }
  }

  const pauseAudio = async () => {
    try {
      const status = await sound.current.getStatusAsync()
      if (status.isLoaded) {
        if (status.isPlaying) {
          await sound.current.pauseAsync()
        }
      }
    } catch (e) {
      console.log('Pause audio error: ', e)
    }
  }

  const playNextAudio = async () => {
    try {
      if (isLooping) {
        const status = await sound.current.getStatusAsync()
        if (status.isLoaded) {
          await sound.current.playFromPositionAsync(0)
        }
      }
      dispatch(playNext())
    } catch (e) {
      console.log('Play next audio error: ', e)
    }
  }

  const playPreviousAudio = async () => {
    try {
      if (isLooping) {
        const status = await sound.current.getStatusAsync()
        if (status.isLoaded) {
          await sound.current.playFromPositionAsync(0)
        }
      }
      dispatch(playPrevious())
    } catch (e) {
      console.log('Play previous error: ', e)
    }
  }

  return (
    <>
      <Pressable style={styles.container} onPress={() => setShowPlayerModal(true)}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{currentMusic ? currentMusic.title : 'Unknown'}</Text>
          <Text style={styles.artist}>{currentMusic ? currentMusic.artist : 'Unknown artist'}</Text>
        </View>
        <View style={styles.iconsWrapper}>
          {!isPlaying && (
            <Pressable
              onPress={playAudio}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Ionicons name="play" size={28} color={Colors.white1} />
            </Pressable>
          )}
          {isPlaying && (
            <Pressable
              onPress={pauseAudio}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Ionicons name="pause" size={28} color={Colors.white1} />
            </Pressable>
          )}
          <Pressable
            onPress={playNextAudio}
            style={({ pressed }) => [styles.skipForward, { opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons name="play-skip-forward" size={28} color={Colors.white1} />
          </Pressable>
        </View>
      </Pressable>
      <PlayerModal
        showPlayerModal={showPlayerModal}
        setShowPlayerModal={setShowPlayerModal}
        sound={sound}
        playAudio={playAudio}
        pauseAudio={pauseAudio}
        playNextAudio={playNextAudio}
        playPreviousAudio={playPreviousAudio}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: 60,
    backgroundColor: Colors.grey1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Math.floor(WIDTH),
    alignItems: 'center',
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.3
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 16
  },
  title: {
    color: Colors.white1,
    fontSize: 20,
    fontWeight: '600'
  },
  artist: {
    color: Colors.white1,
    fontSize: 18,
    fontWeight: '300'
  },
  iconsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 20
  },
  skipForward: {
    marginLeft: 16
  }
})

export default Player
