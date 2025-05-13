import { NavLink } from 'react-router-dom'
import styles from './Layout.module.scss'
const Nav = ({ role }) => {
	return (
		<div className={styles.layout__list}>
			<p>
				<NavLink
					to={'/'}
					className={({ isActive }) => (isActive ? 'link active' : 'link')}
				>
					Список задач
				</NavLink>
			</p>

			{role != 'ADMIN' ? (
				<>
					<p>
						<NavLink
							to={'/stat'}
							className={({ isActive }) => (isActive ? 'link active' : 'link')}
						>
							Статистика
						</NavLink>
					</p>
					<p>
						<NavLink
							to={'/about'}
							className={({ isActive }) => (isActive ? 'link active' : 'link')}
						>
							О приложении
						</NavLink>
					</p>
				</>
			) : (
				<>
					<p>
						<NavLink
							to={'/admin/users'}
							className={({ isActive }) => (isActive ? 'link active' : 'link')}
						>
							Пользователи
						</NavLink>
					</p>
				</>
			)}
		</div>
	)
}
export default Nav
