import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'auth',
	initialState: { isAuthReady: false, isLoading: false },
	reducers: {
		startup(state) {},
		startupSuccess(state) {
			state.isAuthReady = true
		},
		startupFailure() {},

		login(state) {
			state.isLoading = true
		},
		loginSuccess(state) {
			state.isLoading = false
		},
		loginFailure(state, action) {
			state.error = action.payload
			state.isLoading = false
		},

		register(state) {
			state.isLoading = true
		},
		registerSuccess(state) {
			state.isLoading = false
		},
		registerFailure(state, action) {
			state.error = action.payload
			state.isLoading = false
		},

		requestResetPassword(state) {
			state.isLoading = true
		},
		requestResetPasswordSuccess(state) {
			state.isLoading = false
		},
		requestResetPasswordFailure(state, action) {
			state.error = action.payload
			state.isLoading = false
		},

		resetPassword(state) {
			state.isLoading = true
		},
		resetPasswordSuccess(state) {
			state.isLoading = false
		},
		resetPasswordFailure(state, action) {
			state.error = action.payload
			state.isLoading = false
		},
	},
})

export const {
	startupSuccess,
	startup,
	startupFailure,
	login,
	loginSuccess,
	loginFailure,
	register,
	registerSuccess,
	registerFailure,
	requestResetPassword,
	requestResetPasswordSuccess,
	requestResetPasswordFailure,
	resetPassword,
	resetPasswordSuccess,
	resetPasswordFailure,
} = authSlice.actions

export default authSlice.reducer
