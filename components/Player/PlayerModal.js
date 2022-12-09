import { View, Text, Modal, StyleSheet, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '../../styles/Styles'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentMusic,
  selectIsPlaying,
  selectCurrentProgress,
  selectIsLooping,
  setIsLooping,
  setIsShuffle,
  selectIsShuffle,
  selectTrack,
  setShuffledTrack
} from './playerSlice'
import Slider from '@react-native-community/slider'
import { durationToTime, shuffle } from '../../common/Method'
import NotificationManager from '../NotificationManager'

const { height, width } = Dimensions.get('window')

const PlayerModal = (props) => {
  const {
    showPlayerModal,
    setShowPlayerModal,
    sound,
    playAudio,
    pauseAudio,
    playNextAudio,
    playPreviousAudio
  } = props
  const currentMusic = useSelector(selectCurrentMusic)
  const isPlaying = useSelector(selectIsPlaying)
  const currentProgress = useSelector(selectCurrentProgress)
  const isLooping = useSelector(selectIsLooping)
  const isShuffle = useSelector(selectIsShuffle)
  const track = useSelector(selectTrack)
  const dispatch = useDispatch()

  const handleSliding = async (value) => {
    try {
      await sound.current.playFromPositionAsync(Math.round(value) * 1000)
    } catch (e) {
      console.log('Slide error: ', e)
    }
  }

  const setToLooping = async () => {
    try {
      if (!sound || !sound.current) return
      const status = await sound.current.getStatusAsync()
      if (!status.isLoaded) return
      await sound.current.setIsLoopingAsync(true)
      dispatch(setIsLooping(true))
    } catch (e) {
      console.log('Set to looping error: ', e)
    }
  }

  const setToNotLooping = async () => {
    try {
      if (!sound || !sound.current) return
      const status = await sound.current.getStatusAsync()
      if (!status.isLoaded) return
      await sound.current.setIsLoopingAsync(false)
      dispatch(setIsLooping(false))
    } catch (e) {
      console.log('Set to not looping error: ', e)
    }
  }

  const setToShuffle = async () => {
    dispatch(setIsShuffle(true))
    if (isLooping) {
      dispatch(setIsLooping(false))
    }
    const shuffledTrack = [...track]
    shuffle(shuffledTrack)
    dispatch(setShuffledTrack(shuffledTrack))
  }

  const setToNotShuffle = async () => {
    dispatch(setIsShuffle(false))
    dispatch(setShuffledTrack(track))
  }

  return (
    <Modal onShow={false} animationType="slide" visible={showPlayerModal}>
      <SafeAreaView style={styles.container}>
        <View style={styles.returnBtnWrapper}>
          <Pressable
            onPress={() => {
              setShowPlayerModal(false)
            }}
          >
            <Ionicons name="ios-chevron-down" size={24} color={Colors.white1} />
          </Pressable>
        </View>
        <View style={styles.coverWrapper}>
          <View style={styles.coverBase}>
            <Ionicons
              name="musical-notes"
              size={200}
              color={Colors.grey3}
              style={{ marginLeft: -15 }}
            />
          </View>
        </View>
        <View style={styles.lowerPart}>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{currentMusic ? currentMusic.title : 'Unknown'}</Text>
            <Text style={styles.artist}>
              {currentMusic ? currentMusic.artist : 'Unknown artist'}
            </Text>
          </View>
          <View style={styles.progressBarWrapper}>
            <Slider
              minimumTrackTintColor={Colors.white1}
              maximumTrackTintColor={Colors.grey2}
              minimumValue={0}
              maximumValue={currentMusic ? currentMusic.duration : 0}
              onSlidingComplete={handleSliding}
              value={currentProgress}
            />
            <View style={styles.progressTimeWrapper}>
              <Text style={styles.progressTime}>
                {currentMusic ? durationToTime(currentProgress) : '--:--'}
              </Text>
              <Text style={styles.progressTime}>
                {currentMusic
                  ? `-${durationToTime(currentMusic.duration - currentProgress)}`
                  : '--:--'}
              </Text>
            </View>
          </View>
          <View style={styles.controllerWrapper}>
            {isShuffle && (
              <Pressable onPress={setToNotShuffle}>
                <Ionicons name="shuffle" size={30} color={Colors.pink1} />
              </Pressable>
            )}
            {!isShuffle && (
              <Pressable onPress={setToShuffle}>
                <Ionicons name="shuffle" size={30} color={Colors.white1} />
              </Pressable>
            )}
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              onPress={playPreviousAudio}
            >
              <Ionicons name="play-skip-back" size={35} color={Colors.white1} />
            </Pressable>
            {!isPlaying && (
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                onPress={playAudio}
              >
                <Ionicons name="play-circle" size={60} color={Colors.white1} />
              </Pressable>
            )}
            {isPlaying && (
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                onPress={pauseAudio}
              >
                <Ionicons name="pause-circle" size={60} color={Colors.white1} />
              </Pressable>
            )}
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              onPress={playNextAudio}
            >
              <Ionicons name="play-skip-forward" size={35} color={Colors.white1} />
            </Pressable>
            {isLooping && (
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                onPress={setToNotLooping}
              >
                <MaterialIcons name="repeat-one" size={30} color={Colors.pink1} />
              </Pressable>
            )}
            {!isLooping && (
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                onPress={setToLooping}
              >
                <Ionicons name="repeat" size={30} color={Colors.pink1} />
              </Pressable>
            )}
          </View>
          <View style={styles.bottomRow}>
            <NotificationManager />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey1,
    paddingTop: (120 / 1920) * height
  },
  returnBtnWrapper: {
    marginLeft: 15,
    flex: 0.6
  },
  coverWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1.7
  },
  coverBase: {
    backgroundColor: Colors.grey2,
    minHeight: 280,
    minWidth: 280,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lowerPart: {
    marginHorizontal: 20,
    flex: 1.5
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    color: Colors.white1,
    fontSize: 30,
    fontWeight: '600'
  },
  artist: {
    color: Colors.white1,
    fontSize: 18,
    fontWeight: '300'
  },
  progressBarWrapper: {
    marginTop: 15
  },
  progressTimeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressTime: {
    color: Colors.white1,
    fontWeight: '300'
  },
  controllerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center'
  },
  bottomRow: {
    marginTop: 10
  }
})

export default PlayerModal
