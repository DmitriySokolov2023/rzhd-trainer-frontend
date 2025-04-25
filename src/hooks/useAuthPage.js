import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { useAuth } from './useAuth'

export const useAuthPage = () => {
	const [type, setType] = useState('login')
	const { isAuthenticated, setIsAuthenticated } = useAuth()

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
		mutationKey: ['auth'],
		mutationFn: ({ login, password }) =>
			authService.main(login, password, 'login'),
		onSuccess: () => {
			setIsAuthenticated(true)
			reset()
		},
	})

	const onSubmit = data => {
		mutate(data, 'login')
	}

	return { register, handleSubmit, reset, onSubmit }
}
