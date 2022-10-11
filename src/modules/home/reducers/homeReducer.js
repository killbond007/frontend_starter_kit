import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
	name: 'home',
	initialState: { isHomeReady: false, count: 0 },
	reducers: {
		startup(state) {},
		startupSuccess(state) {
			state.isHomeReady = true
		},
		startupFailure() {},

		increment(state) {
			state.count = state.count + 1
		},

		decrement(state) {
			state.count = state.count - 1
		},
	},
})

export const { startupSuccess, startup, startupFailure, increment, decrement } = homeSlice.actions

export default homeSlice.reducer
