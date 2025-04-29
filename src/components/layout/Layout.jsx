import Cookies from 'js-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import { TOKEN } from '../../app.constants'
import { useAuth } from '../../hooks/useAuth'
import styles from './Layout.module.scss'

const Layout = ({ children }) => {
	const { pathname } = useLocation()
	const { setIsAuthenticated } = useAuth()
	const navigate = useNavigate()

	const logoutHandler = () => {
		Cookies.remove(TOKEN)
		Cookies.remove('ROLE')
		setIsAuthenticated(false)
		navigate('/auth')
	}
	return (
		<div className={pathname != '/auth' ? styles.layout : styles.layout__auth}>
			{pathname != '/auth' && (
				<header className={styles.layout__header}>
					<div>Список задач</div>
					<button onClick={() => logoutHandler()}>Выход</button>
				</header>
			)}

			<div className={styles.layout__content}>
				{children && <div>{children}</div>}
			</div>
		</div>
	)
}
export default Layout
