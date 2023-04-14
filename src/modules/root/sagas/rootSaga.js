import { fork, put, race, take, takeLatest } from 'redux-saga/effects'

import {
	fetchBundle,
	fetchBundleSuccess,
	getFromStorage,
	getFromStorageSuccess,
	removeToStorage,
	removeToStorageSuccess,
	request,
	requestFailure,
	requestSuccess,
	setToStorage,
	setToStorageSuccess,
} from 'shared/actions/sharedActions'
import {
	fetchUser,
	fetchUserFailure,
	fetchUserSuccess,
	logout,
	logoutFailure,
	logoutSuccess,
	setToken,
	setTokenFailure,
	setTokenSuccess,
	startup,
	startupFailure,
	startupSuccess,
} from 'modules/root/reducers/rootReducer'

import { resolveApiUrl } from 'shared/utils/urlUtils'

function* watchStartup() {
	yield takeLatest(startup.type, startupSaga)
}

function* startupSaga() {
	try {
		yield put(fetchBundle({ namespace: 'root' }))
		yield take(({ type, payload }) => type === fetchBundleSuccess.type && payload.namespace === 'root')

		yield put(getFromStorage({ id: 'root', resourceKey: 'user' }))
		const {
			payload: { resourceData },
		} = yield take(({ type, payload }) => type === getFromStorageSuccess.type && payload.id === 'root')

		if (resourceData) {
			yield put(setToken({ token: resourceData }))
			yield take(setTokenSuccess.type)

			yield put(fetchUser())
			yield take(fetchUserSuccess.type)
		}
		yield put(startupSuccess())
	} catch (err) {
		yield put(startupFailure(err))
	}
}

export function* watchFetchUser() {
	yield takeLatest(fetchUser.type, fetchUserSaga)
}

export function* fetchUserSaga() {
	try {
		const url = resolveApiUrl('REACT_APP_USER_ROUTE')

		yield put(request({ url, id: 'user' }))

		const { success, failure } = yield race({
			success: take(({ type, payload }) => type === requestSuccess.type && payload.id === 'user'),
			failure: take(({ type, payload }) => type === requestFailure.type && payload.id === 'user'),
		})

		if (success) {
			yield put(fetchUserSuccess({ user: success.payload?.body }))
		} else {
			yield put(removeToStorage({ resourceKey: 'user', resourceId: 'root' }))
			yield put(fetchUserFailure(failure.payload?.error))
			window.location.reload()
		}
	} catch (err) {
		yield put(fetchUserFailure(err))
	}
}

export function* watchSetToken() {
	yield takeLatest(setToken.type, setTokenSaga)
}

export function* setTokenSaga({ payload }) {
	try {
		yield put(setToStorage({ id: 'user', resourceKey: 'user', resourceValue: payload.token }))
		yield take(setToStorageSuccess.type)

		yield put(setTokenSuccess({ token: payload.token }))
	} catch (err) {
		yield put(setTokenFailure(err))
	}
}

export function* watchLogout() {
	yield takeLatest(logout.type, logoutSaga)
}

export function* logoutSaga() {
	try {
		yield put(removeToStorage({ resourceKey: 'user', resourceId: 'root' }))
		yield take(removeToStorageSuccess.type)

		yield put(logoutSuccess())
	} catch (err) {
		yield put(logoutFailure(err))
	}
}

export default function* rootSaga() {
	yield fork(watchStartup)
	yield fork(watchFetchUser)
	yield fork(watchSetToken)
	yield fork(watchLogout)
}
