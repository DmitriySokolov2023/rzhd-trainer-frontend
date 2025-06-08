export function isCursorAfterLastKey(editor, keyClass) {
	const selection = window.getSelection()
	if (!selection || selection.rangeCount === 0) return false

	const range = selection.getRangeAt(0)
	const { startContainer, startOffset } = range

	const childNodes = Array.from(editor.childNodes)
	console.log(childNodes, childNodes.length)
	if (childNodes.length < 2) return false

	const lastNode = childNodes[childNodes.length - 2]
	console.log(lastNode)
	const isKeySpan =
		lastNode.nodeType === 1 && lastNode.classList.contains(keyClass)

	const isCursorAtEnd = (() => {
		if (startContainer === editor) {
			return startOffset === editor.childNodes.length
		}
		if (startContainer.nodeType === Node.TEXT_NODE) {
			const parent = startContainer.parentNode
			return (
				parent === editor.lastChild ||
				parent === lastNode ||
				editor.contains(parent)
			)
		}
		return false
	})()

	return isKeySpan && isCursorAtEnd
}
