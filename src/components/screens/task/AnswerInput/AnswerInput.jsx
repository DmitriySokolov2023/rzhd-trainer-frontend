import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import taskUserService from '../../../../services/taskUser.service'
import { getAnswerAsObject } from '../utils/getAnswerAsObject'
import styles from './AnswerInput.module.scss'
import { useCustomKeyboard } from './hooks/useCustomKeyboard'

export default function AnswerInput({ id }) {
	const editorRef = useRef(null)
	const keyIndexRef = useRef(0)
	const [isCapsLockActive, setIsCapsLockActive] = useState(false)

	const {
		mutate,
		isLoading,
		data: updateStatus,
	} = useMutation({
		mutationKey: ['update task status', id],
		mutationFn: ({ id, userAnswer }) =>
			taskUserService.updateStatusTask(id, userAnswer),
		onSuccess: data => {
			queryClient.invalidateQueries(['task-status', id])
			console.log(data)
		},
	})

	const { data: getStatus } = useQuery({
		queryKey: ['task-status', id],
		queryFn: () => taskUserService.getTaskStatus(id),
	})

	useCustomKeyboard({
		editorRef,
		keyIndexRef,
		styles,
		isCapsLockActive,
		setIsCapsLockActive,
	})

	const handleClick = () => {
		const userAnswer = getAnswerAsObject(editorRef.current)
		mutate({ id, userAnswer })
	}

	return (
		<>
			<div>
				Оценка:{' '}
				{updateStatus?.status ? (
					<span
						className={
							updateStatus[0] !== 'Зачтено' ? styles.red : styles.green
						}
					>
						{updateStatus[0] !== 'Зачтено'
							? `Ошибка в ключе - ${updateStatus[0]}`
							: updateStatus[0]}
					</span>
				) : getStatus?.status ? (
					<span className={styles.green}>Зачтено</span>
				) : (
					'Задание выполняется'
				)}
			</div>
			{!getStatus?.status && (
				<>
					<div
						className={styles.editor}
						contentEditable
						suppressContentEditableWarning
						ref={editorRef}
					></div>
					<div>{isCapsLockActive ? 'ENG' : 'RUS'}</div>
					<button className={styles.task__btn} onClick={handleClick}>
						Отправить ответ
					</button>
				</>
			)}
		</>
	)
}
