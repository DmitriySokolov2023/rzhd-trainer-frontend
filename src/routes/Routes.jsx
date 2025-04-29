import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NotFound from '../components/screens/not-found/NotFound.jsx'
import { useAuth } from '../hooks/useAuth.js'
import PrivateRoute from '../providers/PrivateRoute.jsx'
import { routes } from './routes.data'

const Router = () => {
	const { isAuthenticated } = useAuth()
	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => {
					return (
						<Route
							key={route.path}
							path={route.path}
							element={
								route.auth ? (
									<PrivateRoute
										children={<route.component />}
										isAuthenticated={isAuthenticated}
										requireAdmin={route.requireAdmin}
									/>
								) : (
									<route.component />
								)
							}
						/>
					)
				})}
				<Route path={'*'} element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
export default Router
