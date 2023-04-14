import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { apiContext, apiStore } from 'shared/api'
import { createStore } from 'redux-dynamic-modules'
import { getSagaExtension } from 'redux-dynamic-modules-saga'
import React from 'react'

import rootModule from 'modules/root'

import sagas from 'shared/sagas'

import App from 'shared/components/app/App'

import theme from '__theme__'

import 'assets/locales'

const sagaExtension = getSagaExtension()

export const store = createStore({
	extensions: [sagaExtension],
})

sagaExtension.middleware[0].run(sagas)

store.addModule(rootModule)

const Root = () => {
	return (
		<Provider context={apiContext} store={apiStore}>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ThemeProvider>
			</Provider>
		</Provider>
	)
}

export default Root
