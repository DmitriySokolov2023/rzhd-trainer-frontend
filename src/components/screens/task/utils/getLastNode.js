export function getLastTextNode(node) {
	if (node.nodeType === Node.TEXT_NODE) return node

	for (let i = node.childNodes.length - 1; i >= 0; i--) {
		const child = node.childNodes[i]
		const found = getLastTextNode(child)
		if (found) return found
	}

	return null
}
