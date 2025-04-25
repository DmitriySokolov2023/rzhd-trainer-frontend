import Cookies from 'js-cookie'
import { createContext, useState } from 'react'
import { TOKEN } from '../app.constants'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get(TOKEN))
	const [isRole, setIsRole] = useState('STUDENT')

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, setIsAuthenticated, isRole, setIsRole }}
		>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthProvider
