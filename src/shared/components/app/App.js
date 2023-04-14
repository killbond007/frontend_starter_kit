import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import React, { Suspense } from 'react'

import loadable from '@loadable/component'

import { PrerenderedComponent } from 'react-prerendered-component'

import { selectIsAppReady } from 'modules/root/selectors/rootSelectors'

import ErrorBoundary from 'shared/components/error/ErrorBoundary'

const prerenderedLoadable = (dynamicImport) => {
	const LoadableComponent = loadable(dynamicImport)
	return React.memo((props) => (
		<PrerenderedComponent live={LoadableComponent.load()}>
			<LoadableComponent {...props} />
		</PrerenderedComponent>
	))
}

const Layout = prerenderedLoadable(() => import(/* webpackPrefetch: true */ 'shared/components/layout/Layout'))
const Loader = prerenderedLoadable(() => import(/* webpackPrefetch: true */ 'shared/components/loader/Loader'))
const NoMatchPage = prerenderedLoadable(() => import(/* webpackPrefetch: true */ 'shared/components/page/NoMatchPage'))
const HomePage = prerenderedLoadable(() => import(/* webpackPrefetch: true */ 'modules/home'))
const AuthPage = prerenderedLoadable(() => import(/* webpackPrefetch: true */ 'modules/auth'))
const UserPage = prerenderedLoadable(() => import(/* webpackPrefetch: true */ 'modules/user'))
const LoginPage = prerenderedLoadable(() => import(/* webpackPrefetch: true */ 'modules/auth/components/LoginPage'))
const RegisterPage = prerenderedLoadable(() =>
	import(/* webpackPrefetch: true */ 'modules/auth/components/RegisterPage')
)
const RequestResetPage = prerenderedLoadable(() =>
	import(/* webpackPrefetch: true */ 'modules/auth/components/RequestResetPage')
)
const ResetPasswordPage = prerenderedLoadable(() =>
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
