import { fork } from 'redux-saga/effects'

import apiSaga from 'shared/sagas/apiSagas'
import i18nSaga from 'shared/sagas/i18nSagas'
import index from 'shared/sagas'
import storageSaga from 'shared/sagas/storageSagas'

describe('storageSagas', () => {
	describe('default', () => {
		it('forks api saga', () => {
			const saga = index()
			expect(saga.next().value).toEqual(fork(apiSaga))
		})

		it('forks storage saga', () => {
			const saga = index()
			saga.next()
			expect(saga.next().value).toEqual(fork(storageSaga))
		})

		it('forks i18n saga', () => {
			const saga = index()
			saga.next()
			saga.next()
			expect(saga.next().value).toEqual(fork(i18nSaga))
		})
	})
})
