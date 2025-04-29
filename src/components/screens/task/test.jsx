const allowedKeys = ['A', 'B', 'C', 'D'] // доступные ключи

const AnswerInput = () => {
	const editorRef = useRef(null)
	const [isSelectingKey, setIsSelectingKey] = useState(false)
	const [currentKeyIndex, setCurrentKeyIndex] = useState(0)
	const [layout, setLayout] = useState('ru') // 'ru' или 'en'

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.code === 'AltLeft' || e.code === 'AltRight') {
				e.preventDefault()

				if (!isSelectingKey) {
					setIsSelectingKey(true)
					setCurrentKeyIndex(0)
					showPreviewKey()
				} else {
					// Перебираем следующий ключ
					setCurrentKeyIndex(prev => (prev + 1) % allowedKeys.length)
					updatePreviewKey()
				}
			}

			if (e.ctrlKey) {
				e.preventDefault()
				setLayout(prev => (prev === 'ru' ? 'en' : 'ru'))
			}
		}

		const handleKeyUp = e => {
			if (e.code === 'AltLeft' || e.code === 'AltRight') {
				e.preventDefault()
				insertKey(allowedKeys[currentKeyIndex])
				removePreviewKey()
				setIsSelectingKey(false)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [isSelectingKey, currentKeyIndex])

	const showPreviewKey = () => {
		removePreviewKey()
		const span = document.createElement('span')
		span.className = `${styles.key} ${styles.preview}`
		span.setAttribute('data-preview', 'true')
		span.textContent = allowedKeys[currentKeyIndex]
		insertNodeAtCursor(span)
	}

	const updatePreviewKey = () => {
		const span = editorRef.current.querySelector('[data-preview="true"]')
		if (span) {
			span.textContent = allowedKeys[currentKeyIndex]
		}
	}

	const removePreviewKey = () => {
		const span = editorRef.current.querySelector('[data-preview="true"]')
		if (span) {
			span.remove()
		}
	}

	const insertKey = key => {
		removePreviewKey()

		const span = document.createElement('span')
		span.className = styles.key
		span.textContent = key
		insertNodeAtCursor(span)
		insertNodeAtCursor(document.createTextNode(' '))
	}

	const insertNodeAtCursor = node => {
		const sel = window.getSelection()
		if (!sel || !sel.rangeCount) return

		const range = sel.getRangeAt(0)
		range.deleteContents()
		range.insertNode(node)

		// Перемещаем курсор после вставленного узла
		range.setStartAfter(node)
		range.setEndAfter(node)
		sel.removeAllRanges()
		sel.addRange(range)
	}

	return (
		<div>
			<div className={styles.layoutInfo}>
				Текущая раскладка: {layout.toUpperCase()}
			</div>
			<div
				ref={editorRef}
				className={styles.editor}
				contentEditable={true}
				suppressContentEditableWarning={true}
				spellCheck={false}
				placeholder='Введите ответ...'
				onInput={() => {}} // заглушка для подавления warning
			></div>
		</div>
	)
}

export default AnswerInput
