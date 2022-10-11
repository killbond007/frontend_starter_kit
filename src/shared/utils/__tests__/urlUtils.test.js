import { resolveApiUrl } from '../urlUtils'

describe('urlUtils', () => {
	describe('resolveApiUrl', () => {
		it('should throw an error if the key does not exist in env variables', () => {
			const key = 'foo'
			const err = new Error(`${key} not found in env variables`)

			expect.assertions(2)
			try {
				resolveApiUrl(key)
			} catch (error) {
				expect(error).toBeInstanceOf(Error)
				expect(error).toEqual(err)
			}
		})
	})
})
