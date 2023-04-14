import { fork } from 'redux-saga/effects'

import apiSaga from 'shared/sagas/apiSagas'
import i18nSaga from 'shared/sagas/i18nSagas'
import storageSaga from 'shared/sagas/storageSagas'

export default function* () {
	yield fork(apiSaga)
	yield fork(storageSaga)
	yield fork(i18nSaga)
}
