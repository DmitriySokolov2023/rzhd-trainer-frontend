import { $axios, $axios_img } from '../api'
class TaskUserService {
	async addTask(formData) {
		try {
			const { data } = await $axios_img.post(`/task`, formData)

			return data
		} catch (error) {
			throw new Error(error)
		}
	}
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

	async updateTask(id, formData) {
		try {
			const { data } = await $axios_img.put(`/task/${id}`, formData)
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
	async getTaskStatus(id) {
		try {
			const { data } = await $axios.get(`/status/${id}`)
			return data && data[0].status
		} catch (error) {
			throw new Error(error)
		}
	}
	async updateStatusTask(id, userAnswer) {
		try {
			const { data } = await $axios.put(`/status/${id}`, {
				userAnswer,
			})
			return data
		} catch (error) {
			throw new Error(error)
		}
	}
	async deleteTask(id) {
		try {
			const { data } = await $axios.delete(`/task/${id}`)
			return data
		} catch (error) {
			throw new Error(error)
		}
	}
}

export default new TaskUserService()
