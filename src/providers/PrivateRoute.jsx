import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './AuthProvider'

const PrivateRoute = ({ children, isAuthenticated, requireAdmin }) => {
	const { role } = useContext(AuthContext)

	if (!isAuthenticated) {
		return <Navigate to='/auth' replace />
	}

	if (requireAdmin && role != 'ADMIN') {
		return <Navigate to='/' replace />
	} else {
		return children
	}
}
export default PrivateRoute
