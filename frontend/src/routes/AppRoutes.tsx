import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Card from '../components/common/Card'
import DashboardLayout from '../components/Layout/DashboardLayout'
import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'

const workspaceRoles = ['admin', 'registrar', 'viewer']
const editingRoles = ['admin', 'registrar']
const adminRoles = ['admin']

const workspacePages = [
	{ path: 'dashboard', title: 'Dashboard', description: 'Welcome to the student management workspace.' },
	{ path: 'students', title: 'Students', description: 'Manage student records and enrollment details.' },
	{ path: 'departments', title: 'Departments', description: 'Organize academic departments.' },
	{ path: 'programs', title: 'Programs', description: 'Manage academic programs.' },
	{ path: 'courses', title: 'Courses', description: 'Manage course catalogs and offerings.' },
	{ path: 'instructors', title: 'Instructors', description: 'Manage instructor profiles and assignments.' },
	{ path: 'enrollments', title: 'Enrollments', description: 'Review student course enrollments.' },
	{ path: 'attendance', title: 'Attendance', description: 'Review and manage attendance records.' },
	{ path: 'grades', title: 'Grades', description: 'Review student grades and academic progress.' },
	{ path: 'reports', title: 'Reports', description: 'View student and academic reports.' },
]

type AppRoutesProps = {
	isAuthenticated: boolean
	userRole: string | null
}

function RoutePage({ title, description }: { title: string; description: string }) {
	return (
		<div className="page-content page-content--narrow">
			<div className="showcase__eyebrow">STUDENT MANAGEMENT</div>
			<h1 className="showcase__title">{title}</h1>
			<p className="showcase__intro">{description}</p>
			<Card title={title}>
				<p>This route is ready for its page content.</p>
			</Card>
		</div>
	)
}

function RouteMessage({ title, children }: { title: string; children: string }) {
	return (
		<main className="page-content page-content--narrow">
			<Card title={title}>
				<p>{children}</p>
				<div className="route-message__action">
					<Link className="button button--primary button--md route-message__link" to="/dashboard">
						Return to overview
					</Link>
				</div>
			</Card>
		</main>
	)
}

function AppRoutes({ isAuthenticated, userRole }: AppRoutesProps) {
	return (
		<Routes>
			<Route path="/login" element={<RouteMessage title="Sign in required">Authentication is not connected yet.</RouteMessage>} />
			<Route path="/unauthorized" element={<RouteMessage title="Access denied">Your account does not have access to this page.</RouteMessage>} />
			<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
				<Route element={<DashboardLayout />}>
					<Route index element={<Navigate to="/dashboard" replace />} />
					<Route element={<RoleRoute userRole={userRole} allowedRoles={workspaceRoles} />}>
						{workspacePages.map((page) => (
							<Route
								key={page.path}
								path={page.path}
								element={<RoutePage title={page.title} description={page.description} />}
							/>
						))}
					</Route>
					<Route element={<RoleRoute userRole={userRole} allowedRoles={editingRoles} />}>
						<Route path="students/new" element={<RoutePage title="Register student" description="Add a student to the current academic year." />} />
					</Route>
					<Route element={<RoleRoute userRole={userRole} allowedRoles={adminRoles} />}>
						<Route path="components" element={<RoutePage title="Components" description="Shared interface building blocks for the workspace." />} />
						<Route path="users" element={<RoutePage title="Users" description="Manage workspace accounts and access." />} />
						<Route path="settings" element={<RoutePage title="Settings" description="Configure workspace preferences." />} />
					</Route>
				</Route>
			</Route>
			<Route path="*" element={<RoutePage title="Page not found" description="The requested page does not exist." />} />
		</Routes>
	)
}

export default AppRoutes