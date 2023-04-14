import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import { selectIsReady } from 'modules/auth/selectors/authSelectors'

import Loader from 'shared/components/loader/Loader'

import * as Styled from 'modules/auth/components/__styles__/AuthPage.styles'

const AuthPage = () => {
	const isReady = useSelector(selectIsReady)

	return isReady ? (
		<Styled.Root>
			<Outlet />
		</Styled.Root>
	) : (
		<Loader />
	)
}

export default AuthPage

AuthPage.propTypes = {
	/** Content to display if there are no errors. */
	children: PropTypes.node,
}

AuthPage.defaultProps = {
	children: null,
}
