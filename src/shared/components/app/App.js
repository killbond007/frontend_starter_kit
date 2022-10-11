import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React, { Suspense } from 'react'
import loadable from '@loadable/component'

import { selectIsAppReady } from 'modules/root/selectors/rootSelectors'

import ErrorBoundary from 'shared/components/error/ErrorBoundary'
import Layout from 'shared/components/layout/Layout'
import Loader from 'shared/components/loader/Loader'
import NoMatchPage from 'shared/components/page/NoMatchPage'

const HomePage = loadable(() => import(/* webpackPrefetch: true */ 'modules/home'))
const AuthPage = loadable(() => import(/* webpackPrefetch: true */ 'modules/auth'))
const UserPage = loadable(() => import(/* webpackPrefetch: true */ 'modules/user'))
const LoginPage = loadable(() => import(/* webpackPrefetch: true */ 'modules/auth/components/LoginPage'))
const RegisterPage = loadable(() => import(/* webpackPrefetch: true */ 'modules/auth/components/RegisterPage'))
const RequestResetPage = loadable(() => import(/* webpackPrefetch: true */ 'modules/auth/components/RequestResetPage'))
const ResetPasswordPage = loadable(() =>
	import(/* webpackPrefetch: true */ 'modules/auth/components/ResetPasswordPage')
)

const App = () => {
	const isAppReady = useSelector(selectIsAppReady)

	return isAppReady ? (
		<ErrorBoundary>
			<Suspense fallback="App loading...">
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="auth" element={<AuthPage />}>
							<Route path="register" element={<RegisterPage />} />
							<Route path="login" element={<LoginPage />} />
							<Route path="request-reset-password" element={<RequestResetPage />} />
							<Route path="reset-password" element={<ResetPasswordPage />} />
						</Route>
						<Route path="user" element={<UserPage />} />
						<Route path="*" element={<NoMatchPage />} />
					</Route>
				</Routes>
			</Suspense>
		</ErrorBoundary>
	) : (
		<Loader />
	)
}

export default App
