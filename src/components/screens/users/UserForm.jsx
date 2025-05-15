import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import userService from '../../../services/userService'
import DeadLinePicker from './DeadLinePicker'

const UserForm = ({ user, onUpdate, onDelete, onRegister }) => {
	const { register, handleSubmit, reset } = useForm()
	const [deadline, setDeadline] = useState(new Date())
	const id = user && user.role != 'ADMIN' ? user.id : null

	const onSubmit = data => {
		if (user) {
			onUpdate({ id, data })
		} else {
			onRegister({ ...data, deadline })
		}
		reset()
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ['getDeadline', id],
		queryFn: () => userService.getDeadline(id),
	})

	const { mutate } = useMutation({
		mutationKey: ['updateDate', id],
		mutationFn: ({ id, deadline }) => userService.updateDeadline(id, deadline),
	})

	useEffect(() => {
		if (data && id)
			setDeadline(data.deadline != null ? new Date(data.deadline) : null)
	}, [data])

	const handleChange = date => {
		setDeadline(date)
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>{user ? user.login : <></>}</div>
				<input
					type='text'
					className='input'
					placeholder={user ? 'Новый логин' : 'Логин'}
					{...register('login')}
				/>
				<input
					type='password'
					className='input'
					placeholder={user ? 'Новый пароль' : 'Пароль'}
					{...register('password', {
						minLength: { value: 8, message: 'Минимум 8 символов' },
					})}
				/>

				{!user ? (
					<DeadLinePicker deadline={deadline} handleChange={handleChange} />
				) : (
					<div>
						<DeadLinePicker deadline={deadline} handleChange={handleChange} />
						<button onClick={() => mutate({ id, deadline })}>
							Изменить срок сдачи
						</button>
					</div>
				)}

				<button type='submit'>{user ? 'Редактировать' : '+'}</button>
				{user && (
					<button type='button' onClick={() => onDelete(user.id)}>
						Удалить
					</button>
				)}
			</form>
		</div>
	)
}
export default UserForm
