import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
	return (
		<AppRoutes
			isAuthenticated
			userRole="admin"
		/>
  )
}

export default App