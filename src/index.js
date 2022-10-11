import { createRoot } from 'react-dom/client'
import { makeServer } from 'mocks/index'
import React from 'react'

import 'antd/dist/antd.min.css'

import Root from 'shared/components/Root'

if (process.env.NODE_ENV === 'development') {
	makeServer({ environment: 'development' })
}

const container = document.getElementById('root') || document.createElement('div')
const root = createRoot(container)

root.render(<Root />)

export default class index {}
