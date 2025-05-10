import { useAuthPage } from '../../../hooks/useAuthPage'
import Layout from '../../layout/Layout'
import styles from './Auth.module.scss'
const Auth = () => {
	const { register, handleSubmit, reset, onSubmit, errors, err } = useAuthPage()
	return (
		<Layout>
			<div className={styles.auth}>
				<div className={styles.auth__title}>
					Rzhd | <span className='red'>STUDY</span>
				</div>
				<div className={styles.auth__subtitle}>Авторизация</div>
				<p className='error-input'>{err && err}</p>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
					<p className='error-input'>{errors && errors?.login?.message}</p>
					<input
						className='input'
						type='text'
						{...register('login', { required: 'Введите логин' })}
						placeholder='логин'
					/>
					<p className='error-input'>{errors && errors?.password?.message}</p>
					<input
						type='password'
						className='input'
						{...register('password', {
							required: 'Введите пароль',
							minLength: { value: 4, message: 'Минимум 8 символов' },
						})}
						placeholder='пароль'
					/>
					<button type='submit' className={styles.auth__btn}>
						Войти
					</button>
				</form>
			</div>
		</Layout>
	)
}
export default Auth
