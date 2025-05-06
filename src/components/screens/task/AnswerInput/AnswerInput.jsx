import { useMutation } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import taskUserService from '../../../../services/taskUser.service'
import { useTaskStatus } from '../../tasks/hooks/useTasks'
import { getAnswerAsObject } from '../utils/getAnswerAsObject'
import styles from './AnswerInput.module.scss'
import { useCustomKeyboard } from './hooks/useCustomKeyboard'

export default function AnswerInput({ id }) {
	const editorRef = useRef(null)
	const keyIndexRef = useRef(0)
	const [isCapsLockActive, setIsCapsLockActive] = useState(false)
	const { data: statusData, isLoading: isStatusLoading } = useTaskStatus(id)
	const dataStatus = statusData ? statusData[0].status : false

	const { mutate, isLoading, data } = useMutation({
		mutationKey: ['update task status', id],
		mutationFn: ({ id, userAnswer }) =>
			taskUserService.updateStatusTask(id, userAnswer),
		onSuccess: () => {
			queryClient.invalidateQueries(['get all tasks with status', id])
		},
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
				Оценка:
				{dataStatus ? (
					<span className={styles.green}>Зачтено</span>
				) : data && data[0] ? (
					<span className={styles.red}>{data[0]}</span>
				) : (
					'Задание выполняется'
				)}
			</div>
			{!dataStatus && (
				<>
					<div
						className={styles.editor}
						contentEditable={!dataStatus}
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
