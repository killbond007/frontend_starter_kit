import { isObject, isString } from 'lodash'

export const findLastKeyValue = (data, keyToFind) => {
	if (isObject(data) && data[keyToFind] !== undefined) {
		return findLastKeyValue(data[keyToFind], keyToFind)
	} else {
		return data
	}
}
export const compareByKey = (key) => (a, b) => {
	if (a[key] && b[key]) {
		if (isString(a[key]) && isString(b[key])) {
			return a[key].localeCompare(b[key])
		}
		return a[key] - b[key]
	}

	return 0
}
