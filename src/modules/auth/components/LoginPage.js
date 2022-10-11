import { Button, Form, Input, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React from 'react'

import { selectIsLoading } from 'modules/auth/selectors/authSelectors'

import { login } from 'modules/auth/reducers/authReducer'

import Page from 'shared/components/page/Page'

const LoginPage = () => {
	const isLoading = useSelector(selectIsLoading)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onFinish = ({ email, password }) => dispatch(login({ email, password, navigate }))

	return (
		<Page id="login">
			<Form onFinish={onFinish} layout="vertical">
				<Typography.Title level={2}>Log In</Typography.Title>
				<Form.Item
					label="Email Address"
					name="email"
					rules={[{ required: true, type: 'email', message: 'The input is not valid E-mail!' }]}
				>
					<Input prefix={<UserOutlined />} />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input type="password" autoComplete='"current-password' prefix={<LockOutlined />} />
				</Form.Item>
				<Form.Item>
					<Button disabled={isLoading} loading={isLoading} type="primary" htmlType="submit">
						Login
					</Button>
				</Form.Item>
				<Space direction="vertical" align="center">
					<Typography.Text>{`Don't have an account ?`}</Typography.Text>
					<Link>Sign Up</Link>
					<Link to="/auth/request-reset-password/">Forgot password</Link>
				</Space>
			</Form>
		</Page>
	)
}

export default LoginPage
