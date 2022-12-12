import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authenticated: false,
  playlists: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload
    }
  }
})

export const { setPlaylists, setAuthenticated } = userSlice.actions

export const selectPlaylists = (state) => state.user.playlists

export const selectAuthenticated = (state) => state.user.authenticated

export default userSlice.reducer
