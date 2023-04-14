import { message } from 'antd'

import { api } from './index'

export const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUserInfo: build.query({
			providesTags: () => ['User'],
			query: () => `/users`,
		}),

		deleteUser: build.mutation({
			invalidatesTags: () => ['User'],
			query: (id) => ({ url: `/user/delete/${id}`, method: 'DELETE' }),
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled
					message.success('Success Delete All Products From Shopping Cart !')
				} catch {}
			},
		}),

		addUser: build.mutation({
			invalidatesTags: () => ['User'],
			query: (id) => ({ url: `/user`, method: 'POST' }),
		}),
	}),
})

export const { useGetUserInfoQuery, useAddUserMutation, useDeleteUserMutation } = userApi
