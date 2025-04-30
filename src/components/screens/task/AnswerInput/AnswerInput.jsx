import React, { useEffect, useRef } from 'react'
import styles from './AnswerInput.module.scss'

const keys = ['A', 'B', 'C', 'D', 'E']

export default function AnswerInput() {
	const editorRef = useRef(null)

	useEffect(() => {
		editorRef.current.focus()
	}, [])
	return <div className={styles.editor} contentEditable ref={editorRef}></div>
}
