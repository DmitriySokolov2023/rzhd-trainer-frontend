import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegSave } from 'react-icons/fa'
import userService from '../../../services/userService'
import DeadLinePicker from './DeadLinePicker'
import styles from './Users.module.scss'
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
		onSuccess: () => {
			alert('Срок обновлен!')
		},
	})

	useEffect(() => {
		if (data && id)
			setDeadline(data.deadline != null ? new Date(data.deadline) : null)
	}, [data])

	const handleChange = date => {
		setDeadline(date)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={user ? styles.form__user : styles.form__user_add}
		>
			{user ? (
				<div>
					Пользователь:{' '}
					<span style={{ textDecoration: 'underline' }}>{user.login}</span>{' '}
				</div>
			) : (
				<></>
			)}
			<div className={styles.form__input}>
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

				{!user && (
					<DeadLinePicker deadline={deadline} handleChange={handleChange} />
				)}

				<button type='submit' className='btn-success'>
					{user ? 'Редактировать' : '+'}
				</button>
				{user && (
					<button
						type='button'
						onClick={() => onDelete(user.id)}
						className='btn-danger'
					>
						Удалить
					</button>
				)}
			</div>

			{user && (
				<div className={styles.form__input}>
					<DeadLinePicker deadline={deadline} handleChange={handleChange} />
					<FaRegSave onClick={() => mutate({ id, deadline })} />
				</div>
			)}
		</form>
	)
}
export default UserForm
