import { Layout, Typography } from 'antd'
import styled from '@xstyled/styled-components'

const { Footer: _Footer } = Layout

export const Root = styled(_Footer)`
	background-color: primary.5;
	color: white;
	.ant-divider {
		border-color: white;
	}
	.ant-typography {
		color: white;
	}
	a {
		color: white;
		&:hover {
			text-decoration: underline;
		}
	}
`
export const Info = styled.div`
	display: flex;
	align-items: start;
	justify-content: space-around;
	margin-bottom: 16px;
	a {
		font-size: 18px;
	}
`

export const Description = styled(Typography.Text)`
	font-size: 18px;
	max-width: 300px;
	display: inline-block;
`
export const InfoTitle = styled(Typography.Title).attrs({
	level: 3,
})`
	padding-bottom: 8px;
`
