import { DynamicModuleLoader } from 'redux-dynamic-modules'
import React from 'react'

import userReducer, { startup } from 'modules/user/reducers/userReducer'

import userSaga from 'modules/user/sagas/userSaga'

import UserPage from 'modules/user/components/UserPage'

const moduleToLoad = {
	id: 'user',
	reducerMap: { user: userReducer },
	sagas: [userSaga],
	initialActions: [startup()],
}

export default function DynamicUserPage(props) {
	return (
		<DynamicModuleLoader modules={[moduleToLoad]}>
			<UserPage {...props} />
		</DynamicModuleLoader>
	)
}
