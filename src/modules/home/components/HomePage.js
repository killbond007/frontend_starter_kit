import { Button, Space } from 'antd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import React from 'react'

import { selectIsReady } from 'modules/home/selectors/homeSelectors'

import { decrement, increment } from 'modules/home/reducers/homeReducer'

import Loader from 'shared/components/loader/Loader'

import * as Styled from 'modules/home/components/__styles__/HomePage.styles'

const HomePage = () => {
	const isReady = useSelector(selectIsReady)
	const count = useSelector((state) => state.home.count)

	const dispatch = useDispatch()

	return isReady ? (
		<Styled.Root id="home">
			<Space>
				Clicked: {count} times
				<Button type="primary" onClick={() => dispatch(increment())}>
					+
				</Button>
				<Button onClick={() => dispatch(decrement())}>-</Button>
			</Space>
		</Styled.Root>
	) : (
		<Loader />
	)
}

export default HomePage
