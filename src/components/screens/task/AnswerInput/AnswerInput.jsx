import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import taskUserService from '../../../../services/taskUser.service'
import { getTaskStatus } from '../../tasks/hooks/useTasks'
import { convertToCyrillic, convertToLatin } from '../utils/convertToCyrillic'
import { getAnswerAsObject } from '../utils/getAnswerAsObject'
import { insertKeyToken } from '../utils/insertKeyToken'
import { insertTextAtCursor } from '../utils/insertTextAtCursor'
import { isCursorAfterLastKey } from '../utils/isCursorAfterLastKey'
import styles from './AnswerInput.module.scss'

const KEY_LIST = ['A', 'B', 'C', 'D', 'E']

export default function AnswerInput({ id }) {
	const editorRef = useRef(null)
	const keyIndexRef = useRef(0)
	const [isCapsLockActive, setIsCapsLockActive] = useState(false)
	const { dataStatus } = getTaskStatus(id)
	console.log(id)

	console.log(dataStatus?.status)

	const { mutate, isLoading, data } = useMutation({
		mutationKey: ['update task status', id],
		mutationFn: ({ id, userAnswer }) =>
			taskUserService.updateStatusTask(id, userAnswer),
	})

	useEffect(() => {
		const editor = editorRef.current

		if (!editor) return
		const handleKeyDown = e => {
			if (e.key === 'CapsLock') {
				setIsCapsLockActive(prev => !prev)
			}
			if (e.code.includes('Digit')) {
				e.preventDefault()
				return
			}
			if (e.shiftKey) {
				if (e.key.toLowerCase() === 'х' || e.key.toLowerCase() === '{') {
					e.preventDefault()
					const span = document.createElement('span')
					span.className = styles.spec
					span.textContent = '['
					insertTextAtCursor(span)
				}
				if (e.key.toLowerCase() === 'ъ' || e.key.toLowerCase() === '}') {
					e.preventDefault()
					const span = document.createElement('span')
					span.className = styles.spec
					span.textContent = ']'
					insertTextAtCursor(span)
				}
				if (e.key.toLowerCase() === 'б' || e.key.toLowerCase() === ',') {
					e.preventDefault()
					const span = document.createElement('span')
					span.className = styles.spec
					span.textContent = '<'
					insertTextAtCursor(span)
				}
				if (e.key.toLowerCase() === 'ю' || e.key.toLowerCase() === '.') {
					e.preventDefault()
					const span = document.createElement('span')
					span.className = styles.spec
					span.textContent = '>'
					insertTextAtCursor(span)
				}
				if (e.code === 'Backslash') {
					e.preventDefault()
					const span = document.createElement('span')
					span.className = styles.spec
					span.textContent = '/'
					insertTextAtCursor(span)
				}
			}

			if (e.altKey) {
				e.preventDefault()

				const selection = window.getSelection()
				if (!selection || selection.rangeCount === 0) return

				const isAfterKey = isCursorAfterLastKey(editor, styles.key)

				if (isAfterKey) {
					const lastNode = editor.lastChild
					const prevNode = lastNode.previousSibling

					// Удаляем токен (span) и пробел (text node)
					if (lastNode && prevNode) {
						editor.removeChild(lastNode) // пробел
						editor.removeChild(prevNode) // токен
					}
				}

				const nextKey = KEY_LIST[keyIndexRef.current]
				keyIndexRef.current = (keyIndexRef.current + 1) % KEY_LIST.length
				insertKeyToken(nextKey, selection, styles)
			}

			if (e.key.length === 1 && !e.altKey && !e.shiftKey) {
				e.preventDefault()
				const upperConvertChar = isCapsLockActive
					? convertToLatin(e.key)
					: convertToCyrillic(e.key)

				if (/^[a-zA-Z]$/.test(upperConvertChar)) {
					const span = document.createElement('span')
					span.className = styles.key
					span.textContent = upperConvertChar
					insertTextAtCursor(span) // Вставляем в конец
				} else {
					insertTextAtCursor(upperConvertChar)
				}
			}
		}

		editor.addEventListener('keydown', handleKeyDown)

		return () => {
			editor.removeEventListener('keydown', handleKeyDown)
		}
	})

	const handleClick = () => {
		const userAnswer = getAnswerAsObject(editorRef.current)
		mutate({ id, userAnswer })
		console.log(data)
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
