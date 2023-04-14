import { DynamicModuleLoader } from 'redux-dynamic-modules'
import React from 'react'

import authReducer, { startup } from 'modules/auth/reducers/authReducer'

import authSaga from 'modules/auth/sagas/authSaga'

import AuthPage from 'modules/auth/components/AuthPage'

const moduleToLoad = {
	id: 'auth',
	reducerMap: { auth: authReducer },
	sagas: [authSaga],
	initialActions: [startup()],
}

export default function DynamicAuthPage(props) {
	return (
		<DynamicModuleLoader modules={[moduleToLoad]}>
			<AuthPage {...props} />
		</DynamicModuleLoader>
	)
}
