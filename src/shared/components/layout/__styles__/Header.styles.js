import { Input, Layout, Typography } from 'antd'
import styled from '@xstyled/styled-components'

const { Header: _Header } = Layout

export const Root = styled(_Header)`
	background-color: white;
	position: fixed;
	z-index: 1;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #f0f0f0;
	.ant-menu {
		flex: auto;
		justify-content: right;
		border-bottom: none;
	}
`

export const Title = styled(Typography.Title)`
	color: primary.7 !important;
	margin: 0 8px !important;
`

export const Search = styled(Input.Search)`
	max-width: 500px;
	border-radius: 16px;
`
