import { Button, Form, Input, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React from 'react'

import { selectIsLoading } from 'modules/auth/selectors/authSelectors'

import { requestResetPassword } from 'modules/auth/reducers/authReducer'

import Page from 'shared/components/page/Page'

const RequestResetPage = () => {
	const isLoading = useSelector(selectIsLoading)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onFinish = ({ email }) => dispatch(requestResetPassword({ email, navigate }))

	return (
		<Page id="request-reset-password">
			<Form onFinish={onFinish} layout="vertical">
				<Typography.Title level={2}>Reset Password</Typography.Title>
				<Form.Item
					label="Email Address"
					name="email"
					rules={[{ required: true, type: 'email', message: 'The input is not valid E-mail!' }]}
				>
					<Input prefix={<UserOutlined />} />
				</Form.Item>
				<Form.Item>
					<Button disabled={isLoading} loading={isLoading} type="primary" htmlType="submit">
						Send Password Reset Link
					</Button>
				</Form.Item>
			</Form>
		</Page>
	)
}

export default RequestResetPage
