import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IUser } from '../../types/types'

// Define a type for the slice state
interface UserState {
  user: IUser | null,
  isAuth: boolean
}

// Define the initial state using that type
const initialState: UserState = {
    user: null,
    isAuth: false
}

export const userSlice = createSlice({
  name: 'user',
  
  initialState,
  reducers: {
    login: (state, actions: PayloadAction<IUser>) => {
        state.user = actions.payload
        state.isAuth = true
    },
    logout: (state) => {
        state.isAuth = false
        state.user = null
    }
  },
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer