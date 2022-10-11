import index from '../index.js'

describe('Application root', () => {
	it('Should render app without crashing', () => {
		expect(JSON.stringify(Object.assign({}, index, { _reactInternalInstance: 'censored' }))).toMatchSnapshot()
	})
})
