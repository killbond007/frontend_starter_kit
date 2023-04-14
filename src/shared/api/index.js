import { buildCreateApi, coreModule, fetchBaseQuery, reactHooksModule } from '@reduxjs/toolkit/dist/query/react'
import { configureStore } from '@reduxjs/toolkit'
import { createContext } from 'react'
import { createDispatchHook, createSelectorHook } from 'react-redux'

export const apiContext = createContext(null)

const useDispatch = createDispatchHook(apiContext)
const useSelector = createSelectorHook(apiContext)
const useStore = () => apiStore

const createApi = buildCreateApi(coreModule(), reactHooksModule({ useSelector, useDispatch, useStore }))

export const api = createApi({
	tagTypes: ['User'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://127.0.0.1:3000',
		prepareHeaders: (headers) => {
			headers.set('accept', '*/*')
			const token = localStorage.getItem('user')
			if (token) headers.set('Authorization', `token ${JSON.parse(token)}`)
			return headers
		},
	}),
	endpoints: () => ({}),
})

export const apiStore = configureStore({
	reducer: { api: api.reducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})
