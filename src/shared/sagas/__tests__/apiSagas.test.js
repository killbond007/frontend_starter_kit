import { call, put, takeEvery } from 'redux-saga/effects'

import { request, requestFailure, requestSuccess } from 'shared/actions/sharedActions'
import { requestSaga, watchRequest } from 'shared/sagas/apiSagas'
import { requestService } from 'shared/services/apiServices'

describe('requestSagas', () => {
	describe('watchRequest', () => {
		it('takes every request actions', () => {
			const saga = watchRequest()
			expect(saga.next().value).toEqual(takeEvery(request.type, requestSaga))
		})
	})

	describe('apiSaga', () => {
		const url = 'foo'
		const options = 'bar'
		const id = 'gag'
		const token = undefined

		const responseBody = 'foo'
		const responseStatus = 'bar'
		const responseHeaders = 'gag'

		const payload = {
			url,
			options,
			id,
		}

		it('calls request service', () => {
			const saga = requestSaga({ payload })
			saga.next()
			expect(saga.next().value).toEqual(call(requestService, url, options, token))
		})

		it('puts request success', () => {
			const saga = requestSaga({ payload })
			saga.next()
			saga.next()
			expect(
				saga.next({
					body: responseBody,
					status: responseStatus,
					headers: responseHeaders,
				}).value
			).toEqual(put(requestSuccess({ body: responseBody, status: responseStatus, headers: responseHeaders, id })))
		})

		it('puts request failure', () => {
			const saga = requestSaga({ payload })
			saga.next()
			const err = new Error('error')
			expect(saga.throw(err).value).toEqual(put(requestFailure({ err, id })))
		})
	})
})
