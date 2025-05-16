import { useAuth } from '../../../hooks/useAuth'
import Layout from '../../layout/Layout'
import styles from './Tasks.module.scss'
import TasksList from './TasksList'

const Tasks = () => {
	const { user } = useAuth()
	// const { data } = useQuery({
	// 	queryKey: ['getDeadline', id],
	// 	queryFn: () => userService.getDeadline(),
	// })
	return (
		<Layout>
			<div className={styles.tasks}>
				<TasksList />
			</div>
		</Layout>
	)
}
export default Tasks
