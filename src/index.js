import { hydrate, render } from 'react-dom'
import React from 'react'

import Root from 'shared/components/Root'

import './index.css'

import 'antd/dist/reset.css'

import { makeServer } from './mocks'

if (process.env.NODE_ENV === 'development') {
	makeServer({ environment: 'development' })
}

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
	hydrate(<Root />, rootElement)
} else {
	render(<Root />, rootElement)
}

export default class index {}
