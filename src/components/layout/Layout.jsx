import Cookies from 'js-cookie'
import { IoMdExit } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import { TOKEN } from '../../app.constants'
import { useAuth } from '../../hooks/useAuth'
import styles from './Layout.module.scss'
import Nav from './Nav'

const Layout = ({ children }) => {
	const { pathname } = useLocation()
	const { setIsAuthenticated, setRole, user, role, setUser } = useAuth()
	const navigate = useNavigate()
	const logoutHandler = () => {
		localStorage.removeItem('user')
		Cookies.remove(TOKEN)
		Cookies.remove('ROLE')
		setIsAuthenticated(false)
		setUser(null)
		setRole(null)

		navigate('/auth')
	}

	return (
		<div className={pathname != '/auth' ? styles.layout : styles.layout__auth}>
			{pathname != '/auth' && (
				<header className={styles.layout__header}>
					<div>
						Rzhd | <span className='red'>STUDY</span>
					</div>
					<Nav role={role} />
					<div className={styles.layout__profile}>
						{user && <p>{user.login}</p>}
						<IoMdExit
							onClick={() => logoutHandler()}
							className='exit'
							size={24}
						/>
					</div>
				</header>
			)}

			<div
				className={
					pathname != '/auth'
						? styles.layout__content
						: styles.layout__content_auth
				}
			>
				{children && <div>{children}</div>}
			</div>
		</div>
	)
}
export default Layout
