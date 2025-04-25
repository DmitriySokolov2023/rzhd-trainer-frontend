import Cookies from 'js-cookie'

import { useContext } from 'react'
import { $axios } from '../api'
import { TOKEN } from '../app.constants'
import { AuthContext } from '../providers/AuthProvider'

class AuthService {
	async main(login, password, type) {
		const { setIsRole } = useContext(AuthContext)
		console.log(login, password)
		try {
			const { data } = await $axios.post(`/auth/${type}`, {
				login,
				password,
			})
			console.log(data)
			if (data.token) {
				Cookies.set(TOKEN, data.token)
				setIsRole(data.user.role)
			}

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new AuthService()
