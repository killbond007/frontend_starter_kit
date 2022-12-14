import { call, fork, put, takeEvery } from 'redux-saga/effects'

import i18n from 'assets/locales'

import { fetchBundle, fetchBundleFailure, fetchBundleSuccess } from 'shared/actions/sharedActions'

import { importModuleService } from 'shared/services/moduleServices'

export function* watchFetchBundle() {
	yield takeEvery(fetchBundle.type, fetchBundleSaga)
}

export function* fetchBundleSaga({ payload }) {
	const { namespace } = payload
	try {
		let language = payload.language || process.env.REACT_APP_LANGUAGE
		if (!language) {
			language = i18n.services?.languageDetector?.detect()[0]?.slice(0, 2)
		}
		if (!i18n.hasResourceBundle(language, namespace)) {
			const bundleData = yield call(importModuleService, `assets/locales/${language}/${namespace}.json`)
			i18n.addResourceBundle(language, namespace, bundleData, false, true)
		}

		yield put(fetchBundleSuccess({ namespace, bundleData: i18n.getResourceBundle(language, namespace) }))
	} catch (err) {
		yield put(fetchBundleFailure({ namespace, err }))
	}
}

export default function* i18nSaga() {
	yield fork(watchFetchBundle)
}
