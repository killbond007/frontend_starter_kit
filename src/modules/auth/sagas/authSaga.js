import { fork, put, race, take, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'

import { fetchBundle, fetchBundleSuccess, request, requestFailure, requestSuccess } from 'shared/actions/sharedActions'
import { fetchUser, fetchUserSuccess, setToken, setTokenSuccess } from 'modules/root/reducers/rootReducer'
import {
	login,
	loginFailure,
	loginSuccess,
	register,
	registerFailure,
	registerSuccess,
	requestResetPassword,
	requestResetPasswordFailure,
	requestResetPasswordSuccess,
	resetPassword,
	startup,
	startupFailure,
	startupSuccess,
} from 'modules/auth/reducers/authReducer'

import { resetPasswordFailure } from 'modules/auth/reducers/authReducer'
import { resetPasswordSuccess } from 'modules/auth/reducers/authReducer'
import { resolveApiUrl } from 'shared/utils/urlUtils'

function* watchStartup() {
	yield takeLatest(startup.type, startupSaga)
}

function* startupSaga() {
	try {
		yield put(fetchBundle({ namespace: 'auth' }))
		yield take(({ type, payload }) => type === fetchBundleSuccess.type && payload.namespace === 'auth')

		yield put(startupSuccess())
	} catch (err) {
		yield put(startupFailure(err))
	}
}

export function* watchLogin() {
	yield takeLatest(login.type, loginSaga)
}

export function* loginSaga({ payload: { email, password, navigate } }) {
	try {
		const url = resolveApiUrl('REACT_APP_LOGIN_ROUTE')
		const options = { method: 'POST', body: { email, password } }

		yield put(request({ url, options, id: 'login' }))

		const { success, failure } = yield race({
			success: take(({ type, payload }) => type === requestSuccess.type && payload.id === 'login'),
			failure: take(({ type, payload }) => type === requestFailure.type && payload.id === 'login'),
		})

		if (success) {
			yield put(setToken({ token: success.payload?.body?.token }))
			yield take(setTokenSuccess.type)

			yield put(fetchUser())
			yield take(fetchUserSuccess.type)

			yield put(loginSuccess())

			yield navigate('/')
		} else {
			yield put(loginFailure(failure.payload.error))
		}
	} catch (err) {
		yield put(loginFailure(err))
	}
}

export function* watchRegister() {
	yield takeLatest(register.type, registerSaga)
}

export function* registerSaga({ payload: { formValues, navigate } }) {
	try {
		const url = resolveApiUrl('REACT_APP_REGISTER_ROUTE', { type: formValues.type })
		const options = {
			method: 'POST',
			body: {
				display_name: formValues.display_name,
				password: formValues.password,
				email: formValues.email,
				phone_number: formValues.phone_number,
			},
		}

		yield put(request({ url, options, id: 'register' }))

		const { success, failure } = yield race({
			success: take(({ type, payload }) => type === requestSuccess.type && payload.id === 'register'),
			failure: take(({ type, payload }) => type === requestFailure.type && payload.id === 'register'),
		})

		if (success) {
			yield put(setToken({ token: success.payload?.body?.token }))
			yield take(setTokenSuccess.type)

			yield put(fetchUser())
			yield take(fetchUserSuccess.type)

			yield put(registerSuccess())
			message.success('Success request reset password')
			yield navigate('/')
		} else {
			yield put(registerFailure(failure.payload.error))
		}
	} catch (err) {
		yield put(registerFailure(err))
	}
}

export function* watchRequestResetPassword() {
	yield takeLatest(requestResetPassword.type, RequestResetPasswordSaga)
}

export function* RequestResetPasswordSaga({ payload: { email, navigate } }) {
	try {
		const url = resolveApiUrl('REACT_APP_REQUEST_RESET_PASSWORD_ROUTE')
		const options = { method: 'POST', body: { email, base: process.env.REACT_APP_BASE } }

		yield put(request({ url, options, id: 'request-reset' }))

		const { success, failure } = yield race({
			success: take(({ type, payload }) => type === requestSuccess.type && payload.id === 'request-reset'),
			failure: take(({ type, payload }) => type === requestFailure.type && payload.id === 'request-reset'),
		})

		if (success) {
			yield put(requestResetPasswordSuccess())
			message.success('Success reset password!')
			yield navigate('/auth/login')
		} else {
			yield put(requestResetPasswordFailure(failure.payload.error))
		}
	} catch (err) {
		yield put(requestResetPasswordFailure(err))
	}
}

export function* watchResetPassword() {
	yield takeLatest(resetPassword.type, ResetPasswordSaga)
}

export function* ResetPasswordSaga({ payload: { password, token, navigate } }) {
	try {
		const url = resolveApiUrl('REACT_APP_RESET_USER_PASSWORD_ROUTE')
		const options = { method: 'POST', body: { password, token } }

		yield put(request({ url, options, id: 'reset-password' }))

		const { success, failure } = yield race({
			success: take(({ type, payload }) => type === requestSuccess.type && payload.id === 'reset-password'),
			failure: take(({ type, payload }) => type === requestFailure.type && payload.id === 'reset-password'),
		})

		if (success) {
			yield put(resetPasswordSuccess())

			yield navigate('/')
		} else {
			yield put(resetPasswordFailure(failure.payload.error))
		}
	} catch (err) {
		yield put(resetPasswordFailure(err))
	}
}

export default function* authSaga() {
	yield fork(watchStartup)
	yield fork(watchLogin)
	yield fork(watchRegister)
	yield fork(watchRequestResetPassword)
	yield fork(watchResetPassword)
}
