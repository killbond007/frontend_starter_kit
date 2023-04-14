import { Button, Form, Input, Radio, Select, Typography } from 'antd'
import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React from 'react'

import { selectIsLoading } from 'modules/auth/selectors/authSelectors'

import { register } from 'modules/auth/reducers/authReducer'

import Page from 'shared/components/page/Page'

const RegisterPage = () => {
	const isLoading = useSelector(selectIsLoading)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onFinish = (formValues) => dispatch(register({ formValues, navigate }))

	return (
		<Page id="register">
			<Form layout="vertical" initialValues={{ type: 'consumer', country: 'us' }} onFinish={onFinish}>
				<Typography.Title level={2}>Sign Up</Typography.Title>
				<Form.Item name="type">
					<Radio.Group>
						<Radio value="consumer">Consumer</Radio>
						<Radio value="producer">Producer</Radio>
						<Radio value="vendor">Vendor</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="User name" name="display_name">
					<Input />
				</Form.Item>
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
				<Form.Item
					label="Phone Number"
					name="phone_number"
					rules={[
						{ required: true },
						// {
						// 	pattern: new RegExp(/^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/),
						// 	message: "Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
						// },
					]}
				>
					<Input prefix={<PhoneOutlined />} />
				</Form.Item>
				<Form.Item name="country" label="Country">
					<Select>
						<Select.Option value="us">United States of America (US)</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Button disabled={isLoading} loading={isLoading} type="primary" htmlType="submit">
						Register
					</Button>
				</Form.Item>
			</Form>
		</Page>
	)
}

export default RegisterPage
