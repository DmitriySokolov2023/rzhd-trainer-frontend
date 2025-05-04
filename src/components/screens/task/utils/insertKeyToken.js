export function insertKeyToken(key, selection, styles) {
	if (!selection || !selection.rangeCount) return

	const range = selection.getRangeAt(0)
	range.deleteContents()

	const span = document.createElement('span')
	span.textContent = key
	span.contentEditable = 'false'
	span.className = styles.key

	const space = document.createTextNode('')

	range.insertNode(span)
	range.collapse(false)
	range.insertNode(space)

	range.setStartAfter(space)
	range.setEndAfter(space)
	selection.removeAllRanges()
	selection.addRange(range)
}
