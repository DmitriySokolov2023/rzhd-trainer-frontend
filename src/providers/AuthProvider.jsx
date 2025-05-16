import Cookies from 'js-cookie'
import { createContext, useEffect, useState } from 'react'
import { TOKEN } from '../app.constants'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get(TOKEN))
	const [role, setRole] = useState(Cookies.get('ROLE'))
	const [user, setUser] = useState()
	useEffect(() => {
		setIsAuthenticated(!!Cookies.get(TOKEN))
		setRole(Cookies.get('ROLE'))
		setUser(JSON.parse(localStorage.getItem('user')))
	}, [])
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				role,
				setRole,
				user,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthProvider
