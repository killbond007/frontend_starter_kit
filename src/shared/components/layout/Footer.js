import { Typography } from 'antd'
import { useLocation } from 'react-router-dom'
import React from 'react'

import * as Styled from 'shared/components/layout/__styles__/Footer.styles'

const Footer = () => {
	const location = useLocation()
	return (
		<Styled.Root role="banner">
			{location.pathname === '/' && (
				<>
					<Styled.Info>
						<div>
							<Typography.Title level={2}>Front end starter kit</Typography.Title>
							<Styled.Description>The world’s best frontend starter kit</Styled.Description>
						</div>
					</Styled.Info>
				</>
			)}
		</Styled.Root>
	)
}

export default Footer
