import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.scss'
import AuthProvider from './providers/AuthProvider.jsx'
import Router from './routes/Routes.jsx'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<Router />
		</AuthProvider>
	</QueryClientProvider>
)
