import { HomeOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState } from 'react'

import { selectCurrentUser } from 'modules/root/selectors/rootSelectors'

import { logout } from 'modules/root/reducers/rootReducer'

import * as Styled from 'shared/components/layout/__styles__/Header.styles'

const Header = () => {
	const currentUser = useSelector(selectCurrentUser)

	const [current, setCurrent] = useState()

	const dispatch = useDispatch()

	const _onMenuClick = (e) => setCurrent(e.key)

	const _onLogoutClick = () => dispatch(logout())

	return (
		<Styled.Root role="banner">
			<Menu
				onClick={_onMenuClick}
				selectedKeys={[current]}
				mode="horizontal"
				items={[
					{
						label: <Link to="/">Home</Link>,
						key: 'home',
						icon: <HomeOutlined />,
					},
					{
						label: <Link to="/user">User</Link>,
						key: 'user',
						icon: <UserOutlined />,
					},
					...(!!currentUser
						? [
								{
									label: (
										<Link to="/auth/login" onClick={_onLogoutClick}>
											Logout
										</Link>
									),
									key: 'logout',
									icon: <UserOutlined />,
								},
						  ]
						: [
								{
									label: <Link to="/auth/login">Login</Link>,
									key: 'login',
									icon: <UserOutlined />,
								},
								{
									label: <Link to="/auth/register">Register</Link>,
									key: 'register',
									icon: <UserAddOutlined />,
								},
						  ]),
				]}
			/>
		</Styled.Root>
	)
}

export default Header
