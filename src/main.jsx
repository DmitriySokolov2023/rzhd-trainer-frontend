import { createRoot } from 'react-dom/client'
import './assets/styles/index.scss'
import Router from './routes/Routes.jsx'

createRoot(document.getElementById('root')).render(<Router />)
