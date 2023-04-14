import { createAction } from '@reduxjs/toolkit'

export const request = createAction('api/request')
export const requestSuccess = createAction('api/requestSuccess')
export const requestFailure = createAction('api/requestFailure')

export const fetchBundle = createAction('i18n/fetchBundle')
export const fetchBundleSuccess = createAction('i18n/fetchBundleSuccess')
export const fetchBundleFailure = createAction('i18n/fetchBundleFailure')

export const setToStorage = createAction('storage/setToStorage')
export const setToStorageSuccess = createAction('storage/setToStorageSuccess')
export const setToStorageFailure = createAction('storage/setToStorageFailure')

export const getFromStorage = createAction('storage/getFromStorage')
export const getFromStorageSuccess = createAction('storage/getFromStorageSuccess')
export const getFromStorageFailure = createAction('storage/getFromStorageFailure')

export const removeToStorage = createAction('storage/removeToStorage')
export const removeToStorageSuccess = createAction('storage/removeToStorageSuccess')
export const removeToStorageFailure = createAction('storage/removeToStorageFailure')
