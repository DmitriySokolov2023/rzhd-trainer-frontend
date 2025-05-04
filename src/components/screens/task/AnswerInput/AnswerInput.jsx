import React, { useEffect, useRef } from 'react'
import { insertKeyToken } from '../utils/insertKeyToken'
import { isCursorAfterLastKey } from '../utils/isCursorAfterLastKey'
import styles from './AnswerInput.module.scss'

const KEY_LIST = ['A', 'B', 'C', 'D', 'E']

export default function AnswerInput() {
	const editorRef = useRef(null)
	const keyIndexRef = useRef(0)

	useEffect(() => {
		const editor = editorRef.current

		if (!editor) return
		const handleKeyDown = e => {
			if (e.altKey) {
				e.preventDefault()

				const selection = window.getSelection()
				if (!selection || selection.rangeCount === 0) return

				const isAfterKey = isCursorAfterLastKey(editor, styles.key)

				if (isAfterKey) {
					const lastNode = editor.lastChild
					const prevNode = lastNode.previousSibling

					// Удаляем токен (span) и пробел (text node)
					if (lastNode && lastNode.previousSibling) {
						editor.removeChild(lastNode) // пробел
						editor.removeChild(prevNode) // токен
					}
				}

				const nextKey = KEY_LIST[keyIndexRef.current]
				keyIndexRef.current = (keyIndexRef.current + 1) % KEY_LIST.length

				insertKeyToken(nextKey, selection, styles)
			}
		}

		const handleKeyUp = e => {
			if (!e.altKey) setIsAltPressed(false)
		}

		editor.addEventListener('keydown', handleKeyDown)

		return () => {
			editor.removeEventListener('keydown', handleKeyDown)
		}
	})

	return (
		<div
			className={styles.editor}
			contentEditable
			suppressContentEditableWarning
			ref={editorRef}
		></div>
	)
}
