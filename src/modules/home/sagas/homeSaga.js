import { fetchBundle, fetchBundleSuccess } from 'shared/actions/sharedActions'
import { fork, put, take, takeLatest } from 'redux-saga/effects'
import { startup, startupFailure, startupSuccess } from 'modules/home/reducers/homeReducer'

function* watchStartup() {
	yield takeLatest(startup.type, startupSaga)
}

function* startupSaga() {
	try {
		yield put(fetchBundle({ namespace: 'home' }))
		yield take(({ type, payload }) => type === fetchBundleSuccess.type && payload.namespace === 'home')

		yield put(startupSuccess())
	} catch (err) {
		yield put(startupFailure(err))
	}
}

export default function* homeSaga() {
	yield fork(watchStartup)
}
