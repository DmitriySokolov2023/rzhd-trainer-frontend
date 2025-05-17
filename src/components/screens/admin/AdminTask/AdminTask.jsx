import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { BiTaskX } from 'react-icons/bi'
import { IoAddCircleOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import taskUserService from '../../../../services/taskUser.service'
import Layout from '../../../layout/Layout'
import styles from './AdminTask.module.scss'

const AdminTask = () => {
	const { id } = useParams()
	const isMode = Boolean(id)
	const queryClient = useQueryClient()
	const [err, setErr] = useState(null)
	const [uploadedFile, setUploadedFile] = useState(null)
	const navigate = useNavigate()
	const { data, isLoading, error } = useQuery({
		queryKey: ['get task for admin', id],
		queryFn: () => taskUserService.getTaskById(id),
		enabled: isMode,
	})

	const { mutate } = useMutation({
		onError: err => {
			setErr('Такой файл уже существует')
		},
		mutationKey: ['mutate task', id],
		mutationFn: formData =>
			isMode
				? taskUserService.updateTask(id, formData)
				: taskUserService.addTask(formData),
		onSuccess: () => {
			queryClient.invalidateQueries(['get all tasks with status'])
			setErr(null)
			alert('Данные успешно обновлены!')
			navigate('/')
		},
	})

	const { register, handleSubmit, control, setValue, watch } = useForm({
		defaultValues: {
			title: '',
			body: '',
			imageUrl: null,
			correctAnswer: [],
		},
	})

	const { fields, append, replace, remove } = useFieldArray({
		control,
		name: 'correctAnswer',
	})

	useEffect(() => {
		if (data) {
			setValue('title', data?.title || '')
			setValue('body', data?.body || '')
			setValue('imageUrl', data?.imageUrl)

			if (data.imageUrl) {
				setUploadedFile({ name: data.imageUrl })
			}
			const correctAnswer = data.correctAnswer || {}
			const entries = Object.entries(correctAnswer).map(([key, value]) => ({
				key,
				value,
			}))

			replace(entries.length ? entries : [{ key: '', value: '' }])
		}
	}, [data, setValue, replace])

	const watchedAnswers = watch('correctAnswer')

	const handleAddKey = () => {
		const hasEmpty = watchedAnswers.some(
			({ key, value }) => !key.trim() || !value.trim()
		)
		if (hasEmpty) {
			alert('Сначала заполните все ключи и значения')
			return
		}
		append({ key: '', value: '' })
	}

	const onSubmit = values => {
		const formData = new FormData()

		formData.append('title', values.title)
		formData.append('body', values.body)
		formData.append('imageUrl', values.imageUrl || null)

		const correctAnswerObject = values.correctAnswer.reduce(
			(acc, { key, value }) => {
				if (key.trim()) acc[key] = value
				return acc
			},
			{}
		)

		formData.append('correctAnswer', JSON.stringify(correctAnswerObject))

		if (uploadedFile) {
			formData.append('file', uploadedFile)
		}

		const dataNewTask = {
			title: values.title,
			body: values.body,
			imageUrl: values.imageUrl,
			correctAnswer: correctAnswerObject,
		}

		mutate(formData)
	}

	return (
		<Layout>
			{!isLoading && (
				<div>
					{isMode ? (
						<h2>Редактировать задачу № {id}</h2>
					) : (
						<h2>Добавить задачу</h2>
					)}

					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.form__task}>
							<p>Заголовок</p>
							<input
								type='text'
								defaultValue={data?.title || ''}
								{...register('title', { required: 'Введите заголовок' })}
								className='input-add'
								placeholder='Заголовок задачи'
							/>
							<p>Задание</p>
							<textarea
								type='text'
								className='input-area'
								placeholder='Задание'
								defaultValue={data?.body || ''}
								{...register('body', { required: 'Введите задание' })}
							/>
							<p>
								Изображение{' '}
								{uploadedFile && (
									<span
										onClick={() => {
											setUploadedFile(null)
											setValue('imageUrl', null)
										}}
									>
										Очистить
									</span>
								)}
								{err && <span className={styles.err}>{err}</span>}
							</p>
							<div
								className={styles.form__drop}
								onDragOver={e => e.preventDefault()}
								onDrop={e => {
									e.preventDefault()
									const file = e.dataTransfer.files[0]
									if (file && file.type.startsWith('image/')) {
										setUploadedFile(file)
										setValue('imageUrl', file.name)
									}
								}}
							>
								{uploadedFile
									? uploadedFile.name
									: 'Перетащите изображение сюда'}
								<input type='hidden' {...register('imageUrl')} />
							</div>
						</div>
						<div className={styles.form__answer}>
							<div className={styles.form__plus}>
								Ответ{' '}
								<IoAddCircleOutline
									onClick={handleAddKey}
									style={{ cursor: 'pointer' }}
								/>
							</div>
							{fields.map((field, index) => (
								<div key={field.id}>
									<input
										placeholder='Ключ'
										{...register(`correctAnswer.${index}.key`, {
											required: true,
										})}
										className='input-key'
									/>
									<input
										placeholder='Ответ'
										className='input-answer'
										{...register(`correctAnswer.${index}.value`, {
											required: true,
										})}
									/>

									<BiTaskX className='red' onClick={() => remove(index)} />
								</div>
							))}
						</div>
						<button type='submit' className='btn-success'>
							{isMode ? 'Редактировать' : 'Создать'}
						</button>
					</form>
				</div>
			)}
		</Layout>
	)
}
export default AdminTask
