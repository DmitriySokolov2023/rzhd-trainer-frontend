import React, { useEffect, useRef, useState } from 'react'
import { convertToCyrillic, convertToLatin } from '../utils/convertToCyrillic'
import { insertKeyToken } from '../utils/insertKeyToken'
import { insertTextAtCursor } from '../utils/insertTextAtCursor'
import { isCursorAfterLastKey } from '../utils/isCursorAfterLastKey'
import styles from './AnswerInput.module.scss'

const KEY_LIST = ['A', 'B', 'C', 'D', 'E']

export default function AnswerInput() {
	const editorRef = useRef(null)
	const keyIndexRef = useRef(0)
	const [keyCount, setKeyCount] = useState(0)
	const [isCapsLockActive, setIsCapsLockActive] = useState(false)

	useEffect(() => {
		const editor = editorRef.current

		if (!editor) return
		const handleKeyDown = e => {
			if (e.key === 'CapsLock') {
				setIsCapsLockActive(prev => !prev)
			}

			if (
				(e.key.toLowerCase() === 'х' || e.key.toLowerCase() === '{') &&
				e.shiftKey
			) {
				e.preventDefault()
				const span = document.createElement('span')
				span.className = styles.key
				span.textContent = '['
				insertTextAtCursor(span)
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

	return (
		<>
			<div
				className={styles.editor}
				contentEditable
				suppressContentEditableWarning
				ref={editorRef}
			></div>
			<div>{isCapsLockActive ? 'ENG' : 'RUS'}</div>
		</>
	)
}
