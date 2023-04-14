import { call, fork, put, takeEvery } from 'redux-saga/effects'

import {
	getFromStorage,
	getFromStorageFailure,
	getFromStorageSuccess,
	removeToStorage,
	removeToStorageFailure,
	removeToStorageSuccess,
	setToStorage,
	setToStorageFailure,
	setToStorageSuccess,
} from 'shared/actions/sharedActions'

import { getFromStorageService, removeToStorageService, setToStorageService } from 'shared/services/storageServices'

export function* watchGetFromStorage() {
	yield takeEvery(getFromStorage.type, getFromStorageSaga)
}

export function* getFromStorageSaga({ payload }) {
	const { id } = payload
	try {
		const { resourceKey } = payload

		const resourceData = yield call(getFromStorageService, resourceKey)

		yield put(getFromStorageSuccess({ id, resourceData }))
	} catch (err) {
		yield put(getFromStorageFailure({ id, err }))
	}
}

export function* watchSetToStorage() {
	yield takeEvery(setToStorage.type, setToStorageSaga)
}

export function* setToStorageSaga({ payload }) {
	const { id } = payload
	try {
		const { resourceKey, resourceValue } = payload

		yield call(setToStorageService, resourceKey, resourceValue)
		yield put(setToStorageSuccess({ id }))
	} catch (err) {
		yield put(setToStorageFailure({ id, err }))
	}
}

export function* watchRemoveToStorage() {
	yield takeEvery(removeToStorage.type, removeToStorageSaga)
}

export function* removeToStorageSaga({ payload }) {
	const { resourceId } = payload
	try {
		const { resourceKey } = payload

		yield call(removeToStorageService, resourceKey)

		yield put(removeToStorageSuccess({ resourceId }))
	} catch (err) {
		yield put(removeToStorageFailure({ resourceId, err }))
	}
}

export default function* storageSaga() {
	yield fork(watchSetToStorage)
	yield fork(watchGetFromStorage)
	yield fork(watchRemoveToStorage)
}
