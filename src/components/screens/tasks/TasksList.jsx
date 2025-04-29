import { Link } from 'react-router-dom'
import styles from './Tasks.module.scss'
import { useTasks } from './hooks/useTasks'
const TasksList = () => {
	const { data, isLoading } = useTasks()

	return (
		<>
			{isLoading
				? 'Loading'
				: data?.map(task => (
						<div className={styles.tasks__task} key={task.id}>
							<Link to={`/task/${task.id}`} className={styles.task__title}>
								{task.title}
							</Link>
							<div className={styles.task__status}>
								{task.userTaskStatus[0].status ? 'V' : 'X'}
							</div>
						</div>
				  ))}
		</>
	)
}
export default TasksList
