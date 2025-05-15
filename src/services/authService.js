import Cookies from 'js-cookie'

import { $axios } from '../api'
import { TOKEN } from '../app.constants'

class AuthService {
	async main(login, password, type) {
		try {
			const { data } = await $axios.post(`/auth/${type}`, {
				login,
				password,
			})
			if (data.token) {
				Cookies.set(TOKEN, data.token)
				Cookies.set('ROLE', data.user.role)
			}

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
	async addUser(login, password, deadline, type) {
		try {
			const { data } = await $axios.post(`/auth/${type}`, {
				login,
				password,
				deadline,
			})

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new AuthService()
