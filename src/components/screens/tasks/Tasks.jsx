import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../../hooks/useAuth'
import userService from '../../../services/userService'
import Layout from '../../layout/Layout'
import styles from './Tasks.module.scss'
import TasksList from './TasksList'

const Tasks = () => {
	const { user, role } = useAuth()
	const { id } = user || {}
	const { data } = useQuery({
		queryKey: ['getDeadline', id],
		queryFn: () => userService.getDeadline(id),
		enabled: !!id,
	})
	const isValid = data?.deadline ? new Date(data.deadline) > new Date() : false
	return (
		<Layout>
			<div className={styles.tasks}>
				{role != 'ADMIN' && (
					<div className={styles.tasks__deadline}>
						<p>
							Выполнить до:{' '}
							<span className={isValid ? 'green' : 'red'}>
								{data?.deadline &&
									new Date(data.deadline).toLocaleDateString('ru-RU', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
									})}
							</span>
						</p>
					</div>
				)}
				<div className={styles.tasks__list}>
					{isValid || role === 'ADMIN' ? (
						<TasksList />
					) : (
						<span className='red'>Срок сдачи истек</span>
					)}
				</div>
			</div>
		</Layout>
	)
}
export default Tasks
