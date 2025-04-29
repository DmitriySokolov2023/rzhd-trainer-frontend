import React, { useEffect, useRef, useState } from 'react'
import styles from './AnswerInput.module.scss'

const allowedKeys = ['A', 'B', 'C', 'D', 'F', 'G']

const AnswerInput = () => {
	const [content, setContent] = useState('') // HTML содержимое
	const [isSelectingKey, setIsSelectingKey] = useState(false)
	const [currentKeyIndex, setCurrentKeyIndex] = useState(0)
	const editorRef = useRef(null)
	useEffect(() => {
		const handleKeyDown = e => {
			if (e.altKey) {
				e.preventDefault()
				if (!isSelectingKey) {
					setIsSelectingKey(true)
					setCurrentKeyIndex(0)
					insertKey(allowedKeys[0])
					setCursorAfterNode(editorRef)
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => window.removeEventListener('keydown', handleKeyDown)
	})

	const insertKey = key => {
		setContent(prev => prev + `<span class="key">${key}</span> `)
	}
	const setCursorAfterNode = node => {
		const range = document.createRange()
		const sel = window.getSelection()
		range.setStartAfter(node)
		range.collapse(true)
		sel.removeAllRanges()
		sel.addRange(range)
	}
	return (
		<div>
			<div
				ref={editorRef}
				className={styles.editor}
				contentEditable={true}
				dangerouslySetInnerHTML={{ __html: content }}
			></div>
		</div>
	)
}
export default AnswerInput
