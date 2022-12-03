import { configureStore } from "@reduxjs/toolkit"
import playerReducer from "../components/Player/playerSlice"

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
})
