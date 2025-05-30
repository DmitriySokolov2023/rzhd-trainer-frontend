import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import userService from '../../../../../services/userService'
import {
	convertToCyrillic,
	convertToLatin,
} from '../../utils/convertToCyrillic'
import { getAnswerAsObject } from '../../utils/getAnswerAsObject'
import { insertKeyToken } from '../../utils/insertKeyToken'
import { insertTextAtCursor } from '../../utils/insertTextAtCursor'
import { isCursorAfterLastKey } from '../../utils/isCursorAfterLastKey'

export function useCustomKeyboard({
	editorRef,
	keyIndexRef,
	styles,
	isCapsLockActive,
	setIsCapsLockActive,
	updateStatus,
	mutate,
	id,
}) {
	const { data: KEY_LIST } = useQuery({
		queryKey: ['getKey'],
		queryFn: () => userService.getKey(id),
		enabled: !!id,
	})

	useEffect(() => {
		const editor = editorRef.current
		if (!editor) return
		editor.focus()
		const enforceFocus = e => {
			if (document.activeElement !== editor) {
				e.stopPropagation()
				e.preventDefault()
				editor.focus()
			}
		}

		const handleKeyDown = e => {
			if (e.code.includes('Digit')) {
				e.preventDefault()
				return
			}
			if (e.key === 'Enter') {
				e.preventDefault()
				const userAnswer = getAnswerAsObject(editor)
				mutate({ id, userAnswer })
			}
			if (e.key === 'CapsLock') {
				setIsCapsLockActive(prev => !prev)
			}
			if (e.key === 'Backspace') {
				editor.innerHTML = ''
			}
			if (e.shiftKey) {
				if (e.key.toLowerCase() === 'х' || e.key.toLowerCase() === '{') {
					e.preventDefault()
					const span = document.createElement('span')
					span.className = styles.spec
					span.textContent = '['
					insertTextAtCursor(span)
				}
				if (e.code === 'Equal') {
					e.preventDefault()
					const span = document.createElement('span')
					span.textContent = '+'
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
					span.className = styles.spec
					span.textContent = upperConvertChar
					insertTextAtCursor(span)
				} else {
					insertTextAtCursor(upperConvertChar)
				}
			}
		}

		editor.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', enforceFocus, true)
		return () => {
			editor.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', enforceFocus, true)
		}
	}, [editorRef, keyIndexRef, styles, isCapsLockActive, updateStatus, KEY_LIST])
}
