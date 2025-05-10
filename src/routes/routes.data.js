import Admin from '../components/screens/admin/Admin'
import AdminTask from '../components/screens/admin/AdminTask/AdminTask'
import Auth from '../components/screens/auth/Auth'
import Task from '../components/screens/task/Task'
import Tasks from '../components/screens/tasks/Tasks'

export const routes = [
	{
		path: '/',
		component: Tasks,
		auth: true,
		requireAdmin: false,
	},
	{
		path: '/auth',
		component: Auth,
		auth: false,
		requireAdmin: false,
	},
	{
		path: '/task/:id',
		component: Task,
		auth: true,
		requireAdmin: false,
	},

	{
		path: '/admin',
		component: Admin,
		auth: true,
		requireAdmin: true,
	},
	{
		path: '/admin/task/:id',
		component: AdminTask,
		auth: true,
		requireAdmin: true,
	},
	,
	{
		path: '/admin/task/new',
		component: AdminTask,
		auth: true,
		requireAdmin: true,
	},
]
