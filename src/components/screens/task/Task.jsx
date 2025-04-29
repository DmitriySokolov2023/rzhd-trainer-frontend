import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import taskUserService from '../../../services/taskUser.service'
import Layout from '../../layout/Layout'
import styles from './Task.module.scss'

const Task = () => {
	const { id } = useParams()
	console.log(id)
	const { data } = useQuery({
		queryKey: ['get task by id'],
		queryFn: () => taskUserService.getTaskById(id),
	})

	return (
		<Layout>
			<div className={styles.task}>
				<div className={styles.task__title}>{data.title}</div>
				<div className={styles.task__body}>{data.body}</div>
				{data.imageUrl && <div className={styles.task__image}>Картинка</div>}
				<textarea className={styles.task__answer}></textarea>
				<button className={styles.task__btn}>Отправить ответ</button>
			</div>
		</Layout>
	)
}
export default Task
