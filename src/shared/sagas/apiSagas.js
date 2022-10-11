import { call, fork, put, select, takeEvery } from 'redux-saga/effects'
import { message } from 'antd'

import { selectToken } from 'modules/root/selectors/rootSelectors'

import { request, requestFailure, requestSuccess } from 'shared/actions/sharedActions'

import { requestService } from 'shared/services/apiServices'

export function* watchRequest() {
	yield takeEvery(request.type, requestSaga)
}

export function* requestSaga({ payload }) {
	const { id } = payload

	try {
		const { url, options } = payload
		const token = yield select(selectToken)

		const { body, status, headers } = yield call(requestService, url, options, token)

		yield put(requestSuccess({ body, status, headers, id }))
	} catch (err) {
		message.error(
			err?.response?.data ? Object.values(err?.response?.data)[0] : err?.response?.data?.phone_number || err.message
		)

		yield put(requestFailure({ err, id }))
	}
}

export default function* apiSaga() {
	yield fork(watchRequest)
}
