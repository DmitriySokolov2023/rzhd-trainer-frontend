import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../providers/AuthProvider'
import taskUserService from '../../../services/taskUser.service'
import styles from './Tasks.module.scss'
import { useTasks } from './hooks/useTasks'
const TasksList = () => {
	const { data, isLoading } = useTasks()
	const { role } = useContext(AuthContext)

	const queryClient = useQueryClient()

	const { mutate: deleteTask } = useMutation({
		mutationFn: id => taskUserService.deleteTask(id),
		onSuccess: () => {
			queryClient.invalidateQueries(['get all tasks with status'])
		},
		onError: () => {
			alert('Ошибка при удалении')
		},
	})
	const handleDelete = id => {
		deleteTask(+id)
	}
	return (
		<>
			{isLoading
				? 'Loading'
				: data?.map(task => (
						<div className={styles.tasks__task} key={task.id}>
							<Link
								to={
									role == 'ADMIN'
										? `/admin/task/${task.id}`
										: `/task/${task.id}`
								}
								className={styles.task__title}
							>
								{task.title}
							</Link>
							<div className={styles.task__status}>
								{role == 'ADMIN' ? (
									<button onClick={() => handleDelete(task.id)}>Удалить</button>
								) : task.userTaskStatus[0]?.status ? (
									'V'
								) : (
									'X'
								)}
							</div>
						</div>
				  ))}
			{data?.length == 0 && <h2>Список задач пуст</h2>}
		</>
	)
}
export default TasksList
