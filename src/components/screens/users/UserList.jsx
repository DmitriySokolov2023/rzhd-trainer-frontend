import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import authService from '../../../services/authService'
import userService from '../../../services/userService'
import UserForm from './UserForm'

const UserList = () => {
	const queryClient = useQueryClient()
	const { data } = useQuery({
		queryKey: ['getAllUser'],
		queryFn: () => userService.getAllUser(),
	})
	const { mutate: register } = useMutation({
		mutationKey: ['getAllUser'],
		mutationFn: ({ login, password }) =>
			authService.addUser(login, password, 'register'),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllUser'])
		},
	})
	const { mutate: updateUser } = useMutation({
		mutationKey: ['getAllUser'],
		mutationFn: ({ id, data }) => userService.updateUser(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllUser'])
		},
	})

	const { mutate: deleteUser } = useMutation({
		mutationKey: ['getAllUser'],
		mutationFn: id => userService.deleteUser(id),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllUser'])
		},
	})

	return (
		<div>
			<div>
				<h3>Создать нового</h3>
				<UserForm onRegister={register} />
			</div>
			<h3>Пользователи</h3>
			{data &&
				data.map(user => (
					<UserForm
						user={user}
						onUpdate={updateUser}
						onDelete={deleteUser}
						key={user.id}
					/>
				))}
		</div>
	)
}
export default UserList
