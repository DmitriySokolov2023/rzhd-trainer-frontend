import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useImagePath } from '../../../hooks/useImagePath'
import taskUserService from '../../../services/taskUser.service'
import Layout from '../../layout/Layout'
import AnswerInput from './AnswerInput/AnswerInput'
import styles from './Task.module.scss'

const Task = () => {
	const { id } = useParams()
	let [path, setPath] = useState(null)
	const { data, isLoading, error } = useQuery({
		queryKey: ['get task', id],
		queryFn: () => taskUserService.getTaskById(id),
		enabled: !!id,
	})

	useEffect(() => {
		if (data && data.imageUrl) {
			setPath(useImagePath(data.imageUrl))
		}
	}, [data])

	return (
		<Layout>
			{data && (
				<div className={styles.task}>
					<div className={styles.task__title}>{data.title}</div>
					{path && <img src={path} />}
					<div className={styles.task__body}>{data.body}</div>
					<AnswerInput id={id} />
				</div>
			)}
		</Layout>
	)
}
export default Task
