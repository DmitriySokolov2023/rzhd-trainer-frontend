import Layout from '../../layout/Layout'
import styles from './Tasks.module.scss'
import TasksList from './TasksList'

const Tasks = () => {
	return (
		<Layout>
			<div className={styles.tasks}>
				<TasksList />
			</div>
		</Layout>
	)
}
export default Tasks
