import { useQuery } from '@tanstack/react-query'
import taskUserService from '../../../../services/taskUser.service'

export const useTasks = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['get all tasks with status'],
		queryFn: () => taskUserService.getAllTaskWithStatus(),
	})

	return { data, isLoading, error }
}

export const getTaskStatus = id => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['get all tasks with status', id],
		queryFn: () => taskUserService.getTaskStatus(id),
	})

	const dataStatus = data

	return { dataStatus }
}
