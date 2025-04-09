import { useLocation } from 'react-router-dom'
import styles from './Layout.module.scss'

const Layout = ({ children }) => {
	const { pathname } = useLocation()
	return (
		<div className={pathname != '/auth' ? styles.layout : styles.layout__auth}>
			{pathname != '/auth' && (
				<header className={styles.layout__header}>Список задач</header>
			)}

			<div className={styles.layout__content}>
				{children && <div>{children}</div>}
			</div>
		</div>
	)
}
export default Layout
