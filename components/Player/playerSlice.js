import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isPlaying: false,
  track: [],
  currentIdx: 0,
  isLooping: false,
  currentMusic: undefined,
}

export const playerSlice = createSlice({
  name: "player",
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
      state.currentMusic = state.track[state.currentIdx]
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
  },
})

export const {
  play,
  pause,
  playNext,
  setTrack,
  setCurrentIdx,
  setCurrentMusic,
} = playerSlice.actions

export const selectIsPlaying = (state) => state.player.isPlaying

export const selectTrack = (state) => state.player.track

export const selectCurrentIdx = (state) => state.player.currentIdx

export const selectCurrentMusic = (state) => state.player.currentMusic

export default playerSlice.reducer
