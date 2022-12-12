import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../components/Player/playerSlice'
import userReducer from '../components/User/userSlice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    user: userReducer
  }
})
