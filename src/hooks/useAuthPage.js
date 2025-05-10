import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { useAuth } from './useAuth'

export const useAuthPage = () => {
	const [type, setType] = useState('login')
	const { isAuthenticated, setIsAuthenticated, setRole, setUser } = useAuth()
	const [err, setErr] = useState(null)

	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		mode: 'onChange',
	})

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated])

	const { mutate, isLoading } = useMutation({
		onError: err => {
			setErr('Неверный логин | пароль')
		},
		mutationKey: ['auth'],
		mutationFn: ({ login, password }) =>
			authService.main(login, password, type),
		onSuccess: data => {
			setRole(data.user.role)
			setIsAuthenticated(true)
			setUser(data.user.login)
			setErr(null)
			reset()
		},
	})

	const onSubmit = data => {
		mutate(data)
	}

	return { register, handleSubmit, reset, onSubmit, errors, err }
}
