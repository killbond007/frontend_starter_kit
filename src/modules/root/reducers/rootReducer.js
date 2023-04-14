import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
	name: 'root',
	initialState: { isAppReady: false, token: null, user: null },
	reducers: {
		startup() {},
		startupSuccess(state) {
			state.isAppReady = true
		},
		startupFailure() {},

		fetchUser() {},
		fetchUserSuccess(state, action) {
			state.user = action.payload.user
		},
		fetchUserFailure() {},

		setToken() {},
		setTokenSuccess(state, action) {
			state.token = action.payload.token
		},
		setTokenFailure() {},

		logout() {},
		logoutSuccess(state) {
			state.user = null
			state.token = null
		},
		logoutFailure() {},
	},
})

export const {
	startupSuccess,
	startup,
	startupFailure,
	fetchUser,
	fetchUserSuccess,
	fetchUserFailure,
	setToken,
	setTokenSuccess,
	setTokenFailure,
	logout,
	logoutSuccess,
	logoutFailure,
} = rootSlice.actions

export default rootSlice.reducer
