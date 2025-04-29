import { $axios } from '../api'
class TaskUserService {
	async getAllTask() {
		try {
			const { data } = await $axios.get(`/task`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
	async getTaskById(id) {
		try {
			const { data } = await $axios.get(`/task/${id}`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}

	async getAllTaskWithStatus() {
		try {
			const { data } = await $axios.get(`/status`)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new TaskUserService()
