export const useImagePath = path => {
	if (!path) return null
	return `${import.meta.env.VITE_SERVER_URL}/uploads/${path}`
}
