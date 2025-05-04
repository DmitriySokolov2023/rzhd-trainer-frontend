export const insertTextAtCursor = node => {
	const selection = window.getSelection()
	const range = selection.getRangeAt(0)

	if (!node) return

	if (typeof node === 'string') {
		const textNode = document.createTextNode(node)
		range.deleteContents()
		range.insertNode(textNode)

		range.setStartAfter(textNode)
		range.setEndAfter(textNode)
	} else {
		range.deleteContents()
		range.insertNode(node)

		range.setStartAfter(node)
		range.setEndAfter(node)
	}

	selection.removeAllRanges()
	selection.addRange(range)
}
