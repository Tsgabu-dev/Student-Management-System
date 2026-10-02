import { Navigate, Outlet } from 'react-router-dom'

type RoleRouteProps = {
	userRole: string | null
	allowedRoles: readonly string[]
}

function RoleRoute({ userRole, allowedRoles }: RoleRouteProps) {
	if (!userRole || !allowedRoles.includes(userRole)) {
		return <Navigate to="/unauthorized" replace />
	}

	return <Outlet />
}

export default RoleRoute