import { useQuery } from '@tanstack/react-query'
import taskUserService from '../../../../services/taskUser.service'

export const useTasks = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['get all tasks with status'],
		queryFn: () => taskUserService.getAllTaskWithStatus(),
	})
	console.log(data)
	return { data, isLoading, error }
}
