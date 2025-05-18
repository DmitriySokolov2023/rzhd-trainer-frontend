import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import taskUserService from '../../../../services/taskUser.service'
import styles from './AnswerInput.module.scss'
import { useCustomKeyboard } from './hooks/useCustomKeyboard'

export default function AnswerInput({ id }) {
	const editorRef = useRef(null)
	const keyIndexRef = useRef(0)
	const [isCapsLockActive, setIsCapsLockActive] = useState(false)
	const queryClient = useQueryClient()
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
		updateStatus,
		mutate,
		id,
	})

	return (
		<>
			<div className={styles.mark}>
				<p>
					Оценка:{' '}
					{updateStatus ? (
						<span className={updateStatus[0] !== 'Зачтено' ? 'red' : 'green'}>
							{updateStatus[0] !== 'Зачтено'
								? `Ошибка в ключе - ${updateStatus[0]} / или выбран неверно`
								: updateStatus[0]}
						</span>
					) : getStatus ? (
						<span className={'green'}>Зачтено</span>
					) : (
						<span className={'orange'}>Задание выполняется</span>
					)}
				</p>
			</div>
			{!getStatus && (
				<>
					<div
						className={styles.editor}
						contentEditable
						suppressContentEditableWarning
						ref={editorRef}
					></div>
					<div>{isCapsLockActive ? 'ENG' : 'RUS'}</div>
				</>
			)}
		</>
	)
}
