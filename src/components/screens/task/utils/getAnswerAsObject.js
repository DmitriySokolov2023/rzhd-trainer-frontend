export function getAnswerAsObject(container) {
	const result = {}
	let currentKey = null

	function traverse(node) {
		if (node.nodeType === Node.ELEMENT_NODE) {
			// Проверка, содержит ли класс подстроку "key"
			const hasKeyClass = Array.from(node.classList).some(cls =>
				cls.includes('key')
			)

			if (hasKeyClass) {
				currentKey = node.textContent.trim()
				result[currentKey] = ''
			} else {
				node.childNodes.forEach(traverse)
			}
		} else if (node.nodeType === Node.TEXT_NODE) {
			if (currentKey !== null) {
				result[currentKey] += node.textContent
			}
		}
	}
	container.childNodes.forEach(traverse)
	return result
}
