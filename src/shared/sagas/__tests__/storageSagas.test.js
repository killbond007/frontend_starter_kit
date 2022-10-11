import { call, put, takeEvery } from 'redux-saga/effects'

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

import {
	getFromStorageSaga,
	removeToStorageSaga,
	setToStorageSaga,
	watchGetFromStorage,
	watchRemoveToStorage,
	watchSetToStorage,
} from '../storageSagas'

describe('storageSagas', () => {
	describe('watchGetFromStorage', () => {
		it('links to getFromStorageSaga', () => {
			const saga = watchGetFromStorage()
			expect(saga.next().value).toEqual(takeEvery(getFromStorage.type, getFromStorageSaga))
		})
	})

	describe('getFromStorageSaga', () => {
		const payload = {
			id: 'foo',
			resourceKey: 'bar',
		}

		it('calls service', () => {
			const saga = getFromStorageSaga({ payload })
			expect(saga.next().value).toEqual(call(getFromStorageService, payload.resourceKey))
		})

		it('returns result', () => {
			const saga = getFromStorageSaga({ payload })
			saga.next()
			const data = 'foo'
			expect(saga.next(data).value).toEqual(put(getFromStorageSuccess({ id: payload.id, resourceData: data })))
		})

		it('returns error', () => {
			const saga = getFromStorageSaga({ payload })
			saga.next()
			const err = new Error('error')
			expect(saga.throw(err).value).toEqual(put(getFromStorageFailure({ id: payload.id, err })))
		})
	})

	describe('watchSetToStorage', () => {
		it('links to setToStorageSaga', () => {
			const saga = watchSetToStorage()
			expect(saga.next().value).toEqual(takeEvery(setToStorage.type, setToStorageSaga))
		})
	})

	describe('setToStorageSaga', () => {
		const payload = {
			id: 'foo',
			resourceKey: 'bar',
			resourceValue: 'gag',
		}

		it('calls service', () => {
			const saga = setToStorageSaga({ payload })
			expect(saga.next().value).toEqual(call(setToStorageService, payload.resourceKey, payload.resourceValue))
		})

		it('returns result', () => {
			const saga = setToStorageSaga({ payload })
			saga.next()
			expect(saga.next().value).toEqual(put(setToStorageSuccess({ id: payload.id })))
		})

		it('returns error', () => {
			const saga = setToStorageSaga({ payload })
			saga.next()
			const err = new Error('error')
			expect(saga.throw(err).value).toEqual(put(setToStorageFailure({ id: payload.id, err })))
		})
	})

	describe('watchRemoveToStorage', () => {
		it('links to removeToStorageSaga', () => {
			const saga = watchRemoveToStorage()
			expect(saga.next().value).toEqual(takeEvery(removeToStorage.type, removeToStorageSaga))
		})
	})

	describe('removeToStorageSaga', () => {
		const payload = {
			resourceId: 'foo',
			resourceKey: 'bar',
		}

		it('calls service', () => {
			const saga = removeToStorageSaga({ payload })
			expect(saga.next().value).toEqual(call(removeToStorageService, payload.resourceKey))
		})

		it('returns result', () => {
			const saga = removeToStorageSaga({ payload })
			saga.next()
			expect(saga.next().value).toEqual(put(removeToStorageSuccess({ resourceId: payload.resourceId })))
		})

		it('returns error', () => {
			const saga = removeToStorageSaga({ payload })
			saga.next()
			const err = new Error('error')
			expect(saga.throw(err).value).toEqual(put(removeToStorageFailure({ resourceId: payload.resourceId, err })))
		})
	})
})
