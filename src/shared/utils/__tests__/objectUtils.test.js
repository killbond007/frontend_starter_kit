import { compareByKey, findLastKeyValue } from '../objectUtils'

describe('objectUtils', () => {
	describe('findLastKeyValue', () => {
		it('find the last value with given key on three nested object', () => {
			const objectKey = 'children'
			const data = {
				children: {
					foo: 'bar',
					children: {
						children: 'foo',
					},
				},
			}

			const result = findLastKeyValue(data, objectKey)
			expect(result).toBe('foo')
		})

		it('find last value with given key even if the value is null', () => {
			const objectKey = 'children'
			const data = {
				children: {
					children: null,
				},
			}

			const result = findLastKeyValue(data, objectKey)
			expect(result).toBeNull()
		})

		it('find the last value with given key on first nested object', () => {
			const objectKey = 'children'
			const data = {
				children: 'bar',
			}

			const result = findLastKeyValue(data, objectKey)
			expect(result).toBe('bar')
		})

		it('it finds the last object with given key', () => {
			const objectKey = 'children'
			const data = {
				children: {
					foo: 1,
					bar: 2,
					zog: 3,
				},
			}

			const result = findLastKeyValue(data, objectKey)
			expect(result).toMatchObject({
				foo: 1,
				bar: 2,
				zog: 3,
			})
		})
	})

	describe('compareByKey', () => {
		it('return -1 if both arguments are properties of type string and a[key] is less than b[key]', () => {
			expect(compareByKey('string')({ string: 'bar' }, { string: 'foo' })).toEqual(-1)
		})

		it('return 1 if both arguments are properties of type string and a[key] is greater than b[key]', () => {
			expect(compareByKey('string')({ string: 'foo' }, { string: 'bar' })).toEqual(1)
		})

		it('return 0 if both arguments are properties of type string and a[key] is equal to b[key]', () => {
			expect(compareByKey('string')({ string: 'foo' }, { string: 'foo' })).toEqual(0)
		})

		it('return -1 if both arguments are properties of type number and a[key] is less than b[key]', () => {
			expect(compareByKey('number')({ number: 1 }, { number: 2 })).toEqual(-1)
		})

		it('return 1 if both arguments are properties of type number and a[key] is greater than b[key]', () => {
			expect(compareByKey('number')({ number: 2 }, { number: 1 })).toEqual(1)
		})

		it('return 0 if both arguments are properties of type number and a[key] is equal to b[key]', () => {
			expect(compareByKey('number')({ number: 1 }, { number: 1 })).toEqual(0)
		})

		it('return 0 if both arguments do not have the key', () => {
			expect(compareByKey('foo')({ bar: 1 }, { bar: 1 })).toEqual(0)
		})
	})
})
