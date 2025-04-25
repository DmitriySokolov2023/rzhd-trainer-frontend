import { useAuthPage } from '../../../hooks/useAuthPage'
import Layout from '../../layout/Layout'
import styles from './Auth.module.scss'
const Auth = () => {
	const { register, handleSubmit, reset, onSubmit } = useAuthPage()
	return (
		<Layout>
			<div className={styles.auth}>
				<div className={styles.auth__title}>Авторизация</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type='text'
						{...register('login', { required: 'Введите логин' })}
					/>
					<input
						type='password'
						{...register('password', {
							required: 'Введите пароль',
							minLength: { value: 4, message: 'Минимум 8 символов' },
						})}
					/>
					<button type='submit'>Войти</button>
				</form>
			</div>
		</Layout>
	)
}
export default Auth
