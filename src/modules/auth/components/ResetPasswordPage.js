import { Button, Form, Input, Typography } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React from 'react'

import { selectIsLoading } from 'modules/auth/selectors/authSelectors'

import { resetPassword } from 'modules/auth/reducers/authReducer'

import Page from 'shared/components/page/Page'

const ResetPasswordPage = () => {
	const [searchParams] = useSearchParams()

	const isLoading = useSelector(selectIsLoading)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onFinish = ({ password }) => dispatch(resetPassword({ password, token: searchParams.get('token'), navigate }))

	return (
		<Page id="register">
			<Form layout="vertical" onFinish={onFinish}>
				<Typography.Title level={2}>Reset password</Typography.Title>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{ required: true, message: 'Please input your Password!' },
						{
							pattern: new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])'),
							message: 'Password must contain atleast one uppercase and lowercase letters and a number.',
						},
					]}
				>
					<Input type="password" autoComplete='"current-password' prefix={<LockOutlined />} />
				</Form.Item>
				<Form.Item
					name="confirm"
					label="Confirm Password"
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: 'Please confirm your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve()
								}

								return Promise.reject(new Error('The two passwords that you entered do not match!'))
							},
						}),
					]}
				>
					<Input.Password autoComplete='"current-password' prefix={<LockOutlined />} />
				</Form.Item>
				<Form.Item>
					<Button disabled={isLoading} loading={isLoading} type="primary" htmlType="submit">
						Reset my password
					</Button>
				</Form.Item>
			</Form>
		</Page>
	)
}

export default ResetPasswordPage
