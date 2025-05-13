// import Cookies from 'js-cookie'

import { $axios } from '../api'

// import { $axios } from '../api'
// import { TOKEN } from '../app.constants'

class UserService {
	async getAllUser() {
		try {
			const { data } = await $axios.get('/user')
			console.log(data)
			return data
		} catch (error) {
			throw new Error(error)
		}
	}
	async updateUser(id, formData) {
		try {
			const { data } = await $axios.put(`/user/update/${id}`, formData)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
	async deleteUser(id) {
		try {
			const { data } = await $axios.delete(`/user/delete/${id}`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new UserService()
