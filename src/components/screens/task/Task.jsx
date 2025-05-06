import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import taskUserService from '../../../services/taskUser.service'
import Layout from '../../layout/Layout'
import AnswerInput from './AnswerInput/AnswerInput'
import styles from './Task.module.scss'

const Task = () => {
	const { id } = useParams()
	const { data, isLoading, error } = useQuery({
		queryKey: ['get task', id],
		queryFn: () => taskUserService.getTaskById(id),
		enabled: !!id,
	})

	return (
		<Layout>
			{data && (
				<div className={styles.task}>
					<div className={styles.task__title}>{data.title}</div>
					<div className={styles.task__body}>{data.body}</div>
					{data.imageUrl && <div className={styles.task__image}>Картинка</div>}
					<AnswerInput id={id} />
				</div>
			)}
		</Layout>
	)
}
export default Task
