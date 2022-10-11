import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'user',
	initialState: { isUserReady: false },
	reducers: {
		startup(state) {},
		startupSuccess(state) {
			state.isUserReady = true
		},
		startupFailure() {},
	},
})

export const { startupSuccess, startup, startupFailure } = userSlice.actions

export default userSlice.reducer
