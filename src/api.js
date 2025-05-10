import axios from 'axios'
import Cookies from 'js-cookie'

import { TOKEN } from './app.constants'

const API_URL = `${import.meta.env.VITE_SERVER_URL}/api`

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: Cookies.get(TOKEN) ? `Bearer ${Cookies.get(TOKEN)}` : '',
	},
})

export const $axios_img = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'multipart/form-data',
		Authorization: Cookies.get(TOKEN) ? `Bearer ${Cookies.get(TOKEN)}` : '',
	},
})

$axios.interceptors.request.use(config => {
	const token = Cookies.get(TOKEN)

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	} else {
		delete config.headers.Authorization
	}

	return config
})

$axios_img.interceptors.request.use(config => {
	const token = Cookies.get(TOKEN)

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	} else {
		delete config.headers.Authorization
	}

	return config
})
