import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './DashboardLayout.css'

export type DashboardOutletContext = {
	searchValue: string
	setSearchValue: (value: string) => void
}

function DashboardLayout() {
	const [searchValue, setSearchValue] = useState('')

	return (
		<div className="dashboard-layout">
			<Sidebar />
			<div className="dashboard-layout__column">
				<Navbar searchValue={searchValue} onSearchChange={setSearchValue} />
				<main className="dashboard-layout__main" id="main-content">
					<Outlet context={{ searchValue, setSearchValue } satisfies DashboardOutletContext} />
				</main>
			</div>
		</div>
	)
}

export default DashboardLayout