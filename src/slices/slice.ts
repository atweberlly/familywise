import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Props {
  user: any
}

const initialState: Props = {
  user: [],
}

export const counerSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = counerSlice.actions
export default counerSlice.reducer
