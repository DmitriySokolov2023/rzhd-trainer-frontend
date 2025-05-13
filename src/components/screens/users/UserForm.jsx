import { useForm } from 'react-hook-form'
import DeadLinePicker from './DeadLinePicker'

const UserForm = ({ user, onUpdate, onDelete, onRegister }) => {
	const { register, handleSubmit, reset } = useForm()
	const id = user ? user.id : null
	const onSubmit = data => {
		if (user) {
			onUpdate({ id, data })
		} else {
			onRegister(data)
		}

		reset()
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
				<DeadLinePicker />
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
