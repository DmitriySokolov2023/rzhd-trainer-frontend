export function isCursorAfterLastKey(editor, keyClass) {
	const selection = window.getSelection()
	if (!selection || selection.rangeCount === 0) return false

	let range = selection.getRangeAt(0)

	const { startContainer, startOffset } = range

	if (startContainer != editor) {
		range.setStart(editor, editor.childNodes.length)
	}

	const childNodes = Array.from(editor.childNodes)

	if (childNodes.length < 2) return false

	const lastNode = childNodes[childNodes.length - 2]

	const isKeySpan =
		lastNode.nodeType === 1 && lastNode.classList.contains(keyClass)

	const isCursorAtEnd =
		startContainer === editor && startOffset === editor.childNodes.length

	return isKeySpan && isCursorAtEnd
}
