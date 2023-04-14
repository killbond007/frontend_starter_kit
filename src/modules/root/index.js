import rootReducer, { startup } from 'modules/root/reducers/rootReducer'
import rootSaga from 'modules/root/sagas/rootSaga'

const module = {
	id: 'root',
	reducerMap: { root: rootReducer },
	sagas: [rootSaga],
	initialActions: [startup()],
}

export default module
