import { Model, createServer } from 'miragejs'
import { faker } from '@faker-js/faker'

export function makeServer({ environment = 'development' } = {}) {
	let server = createServer({
		environment,

		models: { user: Model },

		seeds(server) {
			server.create('user', { id: 1, name: 'Bob', email: 'Bob@google.com' })
			server.create('user', { id: 2, name: 'Alice', email: 'Alice@google.com' })
			server.create('user', { id: 3, name: 'Dave', email: 'Dave@google.com' })
		},

		routes() {
			this.urlPrefix = 'http://127.0.0.1:3000'
			this.namespace = ''
			this.timing = 2000

			//auth
			this.post('/users/login/', () => ({ token: 'foo' }))

			this.get('/users/load-user/', () => ({ id: 1, email: 'chenchengalex2016@gmail.com' }))

			//user
			this.get('/users', (schema) => schema.users.all())

			this.post('/user', (schema) =>
				schema.users.create({ id: faker.random.numeric(), name: faker.name.firstName(), email: faker.internet.email() })
			)

			this.delete('/user/delete/:id/', (schema, request) => schema.users.find(request.params.id).destroy())
		},
	})

	return server
}
