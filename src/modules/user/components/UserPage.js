import { Button, Space, Table } from 'antd'
import { useSelector } from 'react-redux'
import React from 'react'

import { selectIsReady } from 'modules/user/selectors/userSelectors'

import Loader from 'shared/components/loader/Loader'

import { useAddUserMutation, useDeleteUserMutation, useGetUserInfoQuery } from 'shared/api/userApi'

import * as Styled from 'modules/user/components/__styles__/UserPage.styles'

const UserPage = () => {
	const isReady = useSelector(selectIsReady)

	const { data, isFetching } = useGetUserInfoQuery()
	const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation()
	const [addUser, { isLoading: isAddLoading }] = useAddUserMutation()

	const _onDeleteUser = (id) => () => deleteUser(id)

	const columns = [
		{ title: 'Name', dataIndex: 'name' },
		{ title: 'Email', dataIndex: 'email' },
		{
			title: 'Action',
			key: 'action',
			render: (data) => (
				<Button type="primary" danger onClick={_onDeleteUser(data.id)}>
					Delete
				</Button>
			),
		},
	]

	return isReady ? (
		<Styled.Root id="user">
			<Space>
				<Button type="primary" onClick={addUser}>
					Add user
				</Button>
			</Space>
			<Table
				rowKey="id"
				columns={columns}
				loading={isFetching || isDeleteLoading || isAddLoading}
				dataSource={data?.users}
			/>
			;
		</Styled.Root>
	) : (
		<Loader />
	)
}

export default UserPage
