import { fetchBundle, fetchBundleSuccess } from 'shared/actions/sharedActions'
import { fork, put, take, takeLatest } from 'redux-saga/effects'
import { startup, startupFailure, startupSuccess } from 'modules/user/reducers/userReducer'

function* watchStartup() {
	yield takeLatest(startup.type, startupSaga)
}

function* startupSaga() {
	try {
		yield put(fetchBundle({ namespace: 'user' }))
		yield take(({ type, payload }) => type === fetchBundleSuccess.type && payload.namespace === 'user')

		yield put(startupSuccess())
	} catch (err) {
		yield put(startupFailure(err))
	}
}

export default function* userSaga() {
	yield fork(watchStartup)
}
