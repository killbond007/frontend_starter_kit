import { Link } from 'react-router-dom'
import { Result } from 'antd'
import React from 'react'

import Page from 'shared/components/page/Page'

const NoMatchPage = () => {
	return (
		<Page id="no-match">
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={<Link to="/"> Back Home</Link>}
			/>
		</Page>
	)
}

export default NoMatchPage
