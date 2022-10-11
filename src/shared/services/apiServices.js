import { startsWith } from 'lodash'
import axios from 'axios'

export const requestService = async (url, options = null, token) => {
	try {
		options = options || {
			method: 'GET',
			query: null,
			body: null,
			headers: {},
		}

		const response = await axios(url, {
			headers: {
				...(token && { Authorization: `token ${token}` }),
				...options.headers,
			},
			method: options.method,
			data: options.body,
			params: options.query,
			responseType: options.responseType,
		})

		if (startsWith(response.status, 2)) {
			return {
				body: response.data,
				status: response.status,
				headers: response.headers,
			}
		} else {
			throw new Error(response.statusText)
		}
	} catch (err) {
		throw err
	}
}
