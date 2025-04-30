import React, { useEffect, useRef, useState } from 'react'
import styles from './AnswerInput.module.scss'

const allowedKeys = ['A', 'B', 'C', 'D', 'E']

export default function AnswerInput() {
	const editorRef = useRef(null)
	const [currentKeyIndex, setCurrentKeyIndex] = useState(0)
	const [activeKeySpan, setActiveKeySpan] = useState(null)

	useEffect(() => {
		editorRef.current.focus()
		const handleKeyDown = e => {
			if (e.altKey) {
				e.preventDefault()

				const nextKey = allowedKeys[currentKeyIndex]
				const sel = window.getSelection()
				if (!sel || sel.rangeCount === 0) return

				if (
					activeKeySpan &&
					editorRef.current.contains(activeKeySpan) &&
					sel.anchorNode === activeKeySpan.parentNode
				) {
					// меняем текст в текущем ключе
					activeKeySpan.textContent = nextKey

					// курсор за span
					const range = document.createRange()
					range.setStartAfter(activeKeySpan)
					range.collapse(true)
					sel.removeAllRanges()
					sel.addRange(range)
				} else {
					// вставка нового ключа
					const span = document.createElement('span')
					span.textContent = nextKey + ' '
					span.className = styles.key
					span.setAttribute('data-key', 'true')

					insertNodeAtCursor(span)
					setActiveKeySpan(span)
				}

				setCurrentKeyIndex(prevIndex => (prevIndex + 1) % allowedKeys.length)
			}
		}
		const handleInput = () => {
			// как только происходит текстовый ввод — обнуляем активный ключ
			setActiveKeySpan(null)
			setCurrentKeyIndex(0)
		}

		window.addEventListener('keydown', handleKeyDown)
		editorRef.current?.addEventListener('input', handleInput)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			editorRef.current?.removeEventListener('input', handleInput)
		}
	}, [currentKeyIndex])

	const insertNodeAtCursor = node => {
		const sel = window.getSelection()
		if (!sel || sel.rangeCount === 0) return

		const range = sel.getRangeAt(0)
		range.deleteContents()
		range.insertNode(node)

		// Переместить курсор сразу после вставки
		range.setStartAfter(node)
		range.setEndAfter(node)
		sel.removeAllRanges()
		sel.addRange(range)
	}

	return (
		<div
			className={styles.editor}
			contentEditable
			ref={editorRef}
			spellCheck={false}
			suppressContentEditableWarning
		></div>
	)
}
