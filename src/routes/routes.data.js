import Auth from '../components/screens/auth/Auth'
import Task from '../components/screens/task/Task'
import Tasks from '../components/screens/tasks/Tasks'

export const routes = [
	{
		path: '/',
		component: Tasks,
		auth: false,
	},
	{
		path: '/auth',
		component: Auth,
		auth: false,
	},
	{
		path: '/task',
		component: Task,
		auth: false,
	},
]
