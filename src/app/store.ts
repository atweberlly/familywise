import userSlice from '../slices/slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
