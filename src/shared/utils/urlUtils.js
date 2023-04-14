import { isObjectLike } from 'lodash'

/**
 * Combines an endpoint name and base URL name to construct the correct URL to query an API, based on environment variables.
 * @param {string} key        Name of the environment variable containing the API endpoint path.
 * @param {object} options    Optional object that contains key/value pairs to replace endpoint dynamic properties.
 * @param {string} apiUrl     Optional base url string.
 * @param {object} queryParams     Optional object that contains key/value pairs for query params.
 * @returns {string} The formatted url.
 */
export const resolveApiUrl = (key, options = null, apiUrl = null, queryParams = null) => {
	let endpoint = process.env[key]
	const baseUrl = apiUrl || process.env.REACT_APP_BASE_URL

	if (endpoint) {
		if (options) {
			Object.keys(options).forEach((key) => {
				const value = options[key]
				endpoint = endpoint.replace(new RegExp(`{{${key}}}`, 'g'), value)
			})
		}
		if (queryParams) {
			Object.keys(queryParams).forEach((key, index) => {
				const value = isObjectLike(queryParams[key]) ? queryParams[key].join(`&${key}=`) : queryParams[key]
				endpoint = `${endpoint}${index === 0 ? '?' : '&'}${key}=${value}`
			})
		}
		return `${baseUrl}${endpoint}`
	}
	throw new Error(`${key} not found in env variables`)
}
