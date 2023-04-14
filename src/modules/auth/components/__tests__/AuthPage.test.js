import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { createStore } from 'redux-dynamic-modules'
import { render } from '@testing-library/react'
import React from 'react'

import theme from '__theme__'

import AuthPage from 'modules/auth/components/AuthPage'

const defaultProps = {}
const renderWithRedux = (initialState = {}, props = {}) => {
	const store = createStore({ initialState })
	store.dispatch = jest.fn()
	return {
		...render(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<AuthPage {...defaultProps} {...props} />
				</ThemeProvider>
			</Provider>
		),
		store,
	}
}

describe('AuthPage', () => {
	describe('matches snapshot', () => {
		const data = [
			{
				title: 'matches snapshot',
				initialState: {},
			},
			{
				title: 'matches snapshot with creationStudy isReady',
				initialState: { isAuthReady: true },
			},
		]

		data.forEach(({ title, props, initialState }) => {
			it(title, () => {
				const { asFragment } = renderWithRedux(initialState, props)
				expect(asFragment()).toMatchSnapshot()
			})
		})
	})
})
