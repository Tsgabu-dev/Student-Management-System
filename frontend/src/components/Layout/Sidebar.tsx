import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
	BookOpen,
	Building2,
	ChartNoAxesCombined,
	ClipboardCheck,
	GraduationCap,
	LayoutDashboard,
	LibraryBig,
	NotebookPen,
	PanelLeftClose,
	PanelLeftOpen,
	Settings2,
	UserRound,
	UserRoundCheck,
	UsersRound,
	type LucideIcon,
} from 'lucide-react'
import './Sidebar.css'

const navigationGroups = [
	{
		label: 'Workspace',
		items: [
			{ id: 'dashboard', label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
			{ id: 'students', label: 'Students', to: '/students', icon: UsersRound },
			{ id: 'departments', label: 'Departments', to: '/departments', icon: Building2 },
			{ id: 'programs', label: 'Programs', to: '/programs', icon: LibraryBig },
			{ id: 'courses', label: 'Courses', to: '/courses', icon: BookOpen },
			{ id: 'instructors', label: 'Instructors', to: '/instructors', icon: UserRound },
			{ id: 'enrollments', label: 'Enrollments', to: '/enrollments', icon: UserRoundCheck },
			{ id: 'attendance', label: 'Attendance', to: '/attendance', icon: ClipboardCheck },
			{ id: 'grades', label: 'Grades', to: '/grades', icon: NotebookPen },
			{ id: 'reports', label: 'Reports', to: '/reports', icon: ChartNoAxesCombined },
		],
	},
	{
		label: 'Administration',
		items: [
			{ id: 'users', label: 'Users', to: '/users', icon: UsersRound },
			{ id: 'settings', label: 'Settings', to: '/settings', icon: Settings2 },
		],
	},
]

function Sidebar() {
	const [isMobileOpen, setIsMobileOpen] = useState(false)

	function closeMobileNavigation() {
		setIsMobileOpen(false)
	}

	return (
		<div className={`sidebar-shell${isMobileOpen ? ' sidebar-shell--open' : ''}`}>
			<button
				className="sidebar__mobile-trigger"
				type="button"
				aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
				aria-expanded={isMobileOpen}
				aria-controls="primary-navigation"
				onClick={() => setIsMobileOpen((isOpen) => !isOpen)}
			>
				{isMobileOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
			</button>

			{isMobileOpen && (
				<button
					className="sidebar__backdrop"
					type="button"
					aria-label="Close navigation"
					onClick={closeMobileNavigation}
				/>
			)}

			<aside className="sidebar" id="primary-navigation" aria-label="Primary navigation">
				<div className="sidebar__brand-row">
					<NavLink className="sidebar__brand" to="/dashboard" onClick={closeMobileNavigation}>
						<span className="sidebar__brand-mark" aria-hidden="true">
							<GraduationCap size={21} strokeWidth={2} />
						</span>
						<span className="sidebar__brand-name">Student Management</span>
					</NavLink>
					<button
						className="sidebar__close"
						type="button"
						aria-label="Close navigation"
						onClick={closeMobileNavigation}
					>
						<PanelLeftClose size={19} />
					</button>
				</div>

				<nav className="sidebar__navigation" aria-label="Main menu">
					{navigationGroups.map((group) => (
						<div className="sidebar__group" key={group.label}>
							<p className="sidebar__group-label">{group.label}</p>
							{group.items.map((item: { id: string; label: string; to: string; icon: LucideIcon }) => {
								const Icon = item.icon

								return (
									<NavLink
										className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
										to={item.to}
										end
										key={item.id}
										onClick={closeMobileNavigation}
									>
										<Icon size={18} strokeWidth={1.8} aria-hidden="true" />
										<span>{item.label}</span>
									</NavLink>
								)
							})}
						</div>
					))}
				</nav>

				<div className="sidebar__account">
					<span className="sidebar__avatar" aria-hidden="true">AD</span>
					<span className="sidebar__account-copy">
						<strong>Administrator</strong>
						<span>School workspace</span>
					</span>
				</div>
			</aside>
		</div>
	)
}

export default Sidebar