import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFount } from '../components/screens/not-found/NotFound'

import { routes } from './routes.data'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => {
					return (
						<Route
							key={route.path}
							path={route.path}
							element={<route.component />}
						/>
					)
				})}

				<Route path='*' element={<NotFount />} />
			</Routes>
		</BrowserRouter>
	)
}
export default Router
