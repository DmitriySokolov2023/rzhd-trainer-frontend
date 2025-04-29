export const insertKey = (key, el, styles) => {
	if (!el) return

	const span = document.createElement('span')
	span.className = styles.key
	span.textContent = key
	el.appendChild(span)
	el.appendChild(document.createTextNode(' '))

	const range = document.createRange()
	const sel = window.getSelection()

	range.selectNodeContents(el)
	range.collapse(false)

	sel.removeAllRanges()
	sel.addRange(range)
	el.focus()
}
