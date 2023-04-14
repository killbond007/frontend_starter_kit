import { Outlet } from 'react-router-dom'
import React from 'react'

import Footer from 'shared/components/layout/Footer'
import Header from 'shared/components/layout/Header'

import * as Styled from 'shared/components/layout/__styles__/Layout.styles'

const Layout = () => {
	return (
		<Styled.Root>
			<Header />
			<Styled.Content>
				<Outlet />
			</Styled.Content>
			<Footer />
		</Styled.Root>
	)
}

export default Layout
