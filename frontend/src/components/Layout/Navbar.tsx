import { CalendarDays, ChevronRight, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import './Navbar.css'

type NavbarProps = {
	searchValue: string
	onSearchChange: (value: string) => void
}

function Navbar({ searchValue, onSearchChange }: NavbarProps) {
	const { pathname } = useLocation()
	const pageTitles: Record<string, string> = {
		'/dashboard': 'Overview',
		'/students': 'Students',
		'/students/new': 'Registration',
		'/departments': 'Departments',
		'/programs': 'Programs',
		'/courses': 'Courses',
		'/instructors': 'Instructors',
		'/enrollments': 'Enrollments',
		'/attendance': 'Attendance',
		'/grades': 'Grades',
		'/reports': 'Reports',
		'/users': 'Users',
		'/settings': 'Settings',
		'/components': 'Components',
	}
	const pageTitle = pageTitles[pathname] ?? 'Workspace'

	return (
		<header className="navbar">
			<nav className="navbar__breadcrumb" aria-label="Breadcrumb">
				<span>Workspace</span>
				<ChevronRight size={15} aria-hidden="true" />
				<strong>{pageTitle}</strong>
			</nav>

			<div className="navbar__actions">
				<label className="navbar__search">
					<Search size={17} aria-hidden="true" />
					<span className="navbar__visually-hidden">Search students</span>
					<input
						type="search"
						value={searchValue}
						placeholder="Search students"
						autoComplete="off"
						onChange={(event) => onSearchChange(event.target.value)}
					/>
				</label>
				<div className="navbar__academic-year">
					<CalendarDays size={16} aria-hidden="true" />
					<span>2026–2027</span>
				</div>
			</div>
		</header>
	)
}

export default Navbar