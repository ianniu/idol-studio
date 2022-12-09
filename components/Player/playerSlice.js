import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isPlaying: false,
  track: [],
  shuffledTrack: [],
  currentIdx: 0,
  isLooping: false,
  isShuffle: false,
  currentMusic: undefined,
  currentProgress: undefined
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play: (state) => {
      if (!state.isPlaying) {
        state.isPlaying = true
      }
    },
    pause: (state) => {
      if (state.isPlaying) {
        state.isPlaying = false
      }
    },
    playNext: (state) => {
      if (state.isLooping) return
      if (!state.track || !state.track.length) return
      if (state.currentIdx + 1 < state.track.length) {
        state.currentIdx += 1
      } else {
        state.currentIdx = 0
      }
      state.currentProgress = 0
      state.currentMusic = state.track[state.currentIdx]
    },
    playPrevious: (state) => {
      if (state.isLooping) return
      if (!state.track || !state.track.length) return
      if (state.currentIdx - 1 < 0) {
        state.currentIdx = state.track.length - 1
      } else {
        state.currentIdx -= 1
      }
      state.currentProgress = 0
      state.currentMusic = state.track[state.currentIdx]
    },
    playNextShuffle: (state) => {
      if (!state.shuffledTrack || !state.shuffledTrack.length) return
      if (state.currentIdx + 1 < state.shuffledTrack.length) {
        state.currentIdx += 1
      } else {
        state.currentIdx = 0
      }
      state.currentProgress = 0
      state.currentMusic = state.shuffledTrack[state.currentIdx]
    },
    playPreviousShuffle: (state) => {
      if (!state.shuffledTrack || !state.shuffledTrack.length) return
      if (state.currentIdx - 1 < 0) {
        state.currentIdx = state.track.length - 1
      } else {
        state.currentIdx -= 1
      }
      state.currentProgress = 0
      state.currentMusic = state.shuffledTrack[state.currentIdx]
    },
    setTrack: (state, action) => {
      state.track = action.payload
    },
    setCurrentIdx: (state, action) => {
      state.currentIdx = action.payload
    },
    setCurrentMusic: (state, action) => {
      state.currentMusic = action.payload
    },
    setCurrentProgress: (state, action) => {
      state.currentProgress = action.payload
    },
    setIsLooping: (state, action) => {
      state.isLooping = action.payload
    },
    setIsShuffle: (state, action) => {
      state.isShuffle = action.payload
    },
    setShuffledTrack: (state, action) => {
      state.shuffledTrack = action.payload
    }
  }
})

export const {
  play,
  pause,
  playNext,
  playPrevious,
  setTrack,
  setCurrentIdx,
  setCurrentMusic,
  setCurrentProgress,
  setIsLooping,
  setIsShuffle,
  setShuffledTrack,
  playNextShuffle,
  playPreviousShuffle
} = playerSlice.actions

export const selectIsPlaying = (state) => state.player.isPlaying

export const selectTrack = (state) => state.player.track

export const selectCurrentIdx = (state) => state.player.currentIdx

export const selectCurrentMusic = (state) => state.player.currentMusic

export const selectCurrentProgress = (state) => state.player.currentProgress

export const selectIsLooping = (state) => state.player.isLooping

export const selectIsShuffle = (state) => state.player.isShuffle

export const selectShuffledTrack = (state) => state.player.shuffledTrack

export default playerSlice.reducer
