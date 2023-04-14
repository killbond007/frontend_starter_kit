import { Layout } from 'antd'
import styled from '@xstyled/styled-components'

const { Content: _Content } = Layout

export const Root = styled(Layout)`
	min-height: 100vh;
`

export const Content = styled(_Content)`
	margin-top: 64px;
	background-color: white;
`
