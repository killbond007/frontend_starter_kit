import { DynamicModuleLoader } from 'redux-dynamic-modules'
import React from 'react'

import homeReducer, { startup } from 'modules/home/reducers/homeReducer'

import homeSaga from 'modules/home/sagas/homeSaga'

import HomePage from 'modules/home/components/HomePage'

const moduleToLoad = {
	id: 'home',
	reducerMap: { home: homeReducer },
	sagas: [homeSaga],
	initialActions: [startup()],
}

export default function DynamicHomePage(props) {
	return (
		<DynamicModuleLoader modules={[moduleToLoad]}>
			<HomePage {...props} />
		</DynamicModuleLoader>
	)
}
