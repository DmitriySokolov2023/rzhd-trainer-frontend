import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import authService from '../../../services/authService'
import userService from '../../../services/userService'
import UserForm from './UserForm'
import styles from './Users.module.scss'

const UserList = () => {
	const queryClient = useQueryClient()
	const { data } = useQuery({
		queryKey: ['getAllUser'],
		queryFn: () => userService.getAllUser(),
	})
	const { mutate: register } = useMutation({
		mutationKey: ['getAllUser'],
		mutationFn: ({ login, password, deadline }) =>
			authService.addUser(login, password, deadline, 'register'),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllUser'])
		},
	})
	const { mutate: updateUser } = useMutation({
		mutationKey: ['getAllUser'],
		mutationFn: ({ id, data }) => userService.updateUser(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllUser'])
			alert('Данные обновлены!')
		},
	})

	const { mutate: deleteUser } = useMutation({
		mutationKey: ['getAllUser'],
		mutationFn: id => userService.deleteUser(id),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllUser'])
			alert('Пользователь удален')
		},
	})

	return (
		<div>
			<div style={{ marginBottom: '20px' }}>
				<h3 style={{ marginBottom: '10px' }}>Создать нового</h3>
				<UserForm onRegister={register} />
			</div>
			<h3 style={{ marginBottom: '10px' }}>Пользователи</h3>
			{data && (
				<div className={styles.form__list}>
					{data.map(user => (
						<UserForm
							user={user}
							onUpdate={updateUser}
							onDelete={deleteUser}
							key={user.id}
						/>
					))}
				</div>
			)}
		</div>
	)
}
export default UserList
