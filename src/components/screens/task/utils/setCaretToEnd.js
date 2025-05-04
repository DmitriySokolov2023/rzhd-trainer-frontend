export const setCaretToEnd = el => {
	if (!el) return

	const range = document.createRange()
	const selection = window.getSelection()

	range.selectNodeContents(el)
	range.collapse(false) // ставим в конец

	selection.removeAllRanges()
	selection.addRange(range)
}
