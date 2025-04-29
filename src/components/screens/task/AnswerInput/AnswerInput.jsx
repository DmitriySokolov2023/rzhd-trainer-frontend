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
				} else {
					const nextIndex = (currentKeyIndex + 1) % allowedKeys.length
					setCurrentKeyIndex(nextIndex)
					replaceLastKey(allowedKeys[nextIndex])
				}
			} else if (isSelectingKey) {
				setIsSelectingKey(false)
			} else {
				if (e.key.length === 1) {
					setContent(prev => prev + e.key)
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isSelectingKey, currentKeyIndex])

	const insertKey = key => {
		setContent(prev => prev + `<span class="key">${key}</span> `)
	}

	const replaceLastKey = key => {
		setContent(prev => {
			const parts = prev.split(/(<span class="key">.*?<\/span>)/g)
			for (let i = parts.length - 1; i >= 0; i--) {
				if (parts[i].includes('class="key"')) {
					parts[i] = `<span class="key">${key}</span>`
					break
				}
			}
			return parts.join('')
		})
	}
	return (
		<div>
			<div
				ref={editorRef}
				className={styles.editor}
				contentEditable={false}
				dangerouslySetInnerHTML={{ __html: content }}
			></div>
		</div>
	)
}
export default AnswerInput
