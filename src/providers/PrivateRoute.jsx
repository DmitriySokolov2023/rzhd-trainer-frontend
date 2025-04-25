import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, isAuthenticated, isRole }) => {
	return isAuthenticated ? children : <Navigate to='/auth' replace />
}
export default PrivateRoute
