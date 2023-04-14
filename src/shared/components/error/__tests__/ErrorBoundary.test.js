import { render, waitFor } from '@testing-library/react'
import React from 'react'

import ErrorBoundary from '../ErrorBoundary'

const getInstance = (props = {}) => <ErrorBoundary>{props.children}</ErrorBoundary>

describe('ErrorBoundary', () => {
	it('matches snapshot', () => {
		const { asFragment } = render(getInstance())
		expect(asFragment()).toMatchSnapshot()
	})

	test('act works in this case', async () => {
		await waitFor(() => {
			const { getByText } = render(getInstance({ children: <div>ErrorBoundary</div> }))
			expect(getByText('ErrorBoundary')).toBeVisible()
		})
	})

	it('renders children', () => {
		const { getByText } = render(getInstance({ children: <div>ErrorBoundary</div> }))
		expect(getByText('ErrorBoundary')).toBeVisible()
	})
})
