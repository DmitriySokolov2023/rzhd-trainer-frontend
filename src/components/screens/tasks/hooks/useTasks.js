import { useQuery } from '@tanstack/react-query'
import taskUserService from '../../../../services/taskUser.service'

export const useTasks = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['get all tasks with status'],
		queryFn: () => taskUserService.getAllTaskWithStatus(),
		onSuccess: () => {
			console.log('Обнова')
		},
	})

	return { data, isLoading, error }
}
