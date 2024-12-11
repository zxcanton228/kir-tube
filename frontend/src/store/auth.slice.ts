import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { EnumTokens } from 'src/types/auth.types'
import type { IUser } from 'src/types/user.types'

interface IAuthState {
	accessToken: string | null
	user: IUser | null
	isLoggedIn: boolean
}

const initialState: IAuthState = {
	user: null,
	isLoggedIn: !!Cookies.get(EnumTokens.ACCESS_TOKEN),
	accessToken: Cookies.get(EnumTokens.ACCESS_TOKEN) || null
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthData(state, action: PayloadAction<{ user: IUser; accessToken: string }>) {
			state.user = action.payload.user
			state.isLoggedIn = true
			state.accessToken = action.payload.accessToken
		},
		clearAuthData(state) {
			state.user = null
			state.isLoggedIn = false
			state.accessToken = null
		}
	}
})
export const { setAuthData, clearAuthData } = authSlice.actions
