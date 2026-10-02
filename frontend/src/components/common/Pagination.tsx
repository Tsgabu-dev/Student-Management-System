import './Pagination.css'

type PageItem = number | 'start-ellipsis' | 'end-ellipsis'

function getPageItems(currentPage: number, pageCount: number): PageItem[] {
	if (pageCount <= 7) {
		return Array.from({ length: pageCount }, (_, index) => index + 1)
	}

	const firstVisiblePage = Math.max(2, currentPage - 1)
	const lastVisiblePage = Math.min(pageCount - 1, currentPage + 1)
	const items: PageItem[] = [1]

	if (firstVisiblePage > 2) items.push('start-ellipsis')
	for (let pageNumber = firstVisiblePage; pageNumber <= lastVisiblePage; pageNumber += 1) {
		items.push(pageNumber)
	}
	if (lastVisiblePage < pageCount - 1) items.push('end-ellipsis')
	items.push(pageCount)

	return items
}

type PaginationProps = {
	page: number
	pageSize: number
	totalItems: number
	onPageChange: (page: number) => void
}

function Pagination({ page, pageSize, totalItems, onPageChange }: PaginationProps) {
	const itemCount = Math.max(0, totalItems)
	const itemsPerPage = Math.max(1, pageSize)
	const pageCount = Math.max(1, Math.ceil(itemCount / itemsPerPage))
	const currentPage = Math.min(Math.max(page, 1), pageCount)
	const firstItem = itemCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
	const lastItem = Math.min(currentPage * itemsPerPage, itemCount)
	const pageItems = getPageItems(currentPage, pageCount)

	return (
		<nav className="pagination" aria-label="Table pagination">
			<span className="pagination__summary" aria-live="polite">
				Showing {firstItem}–{lastItem} of {itemCount}
			</span>
			<div className="pagination__controls">
				<button
					className="pagination__button"
					type="button"
					disabled={currentPage <= 1}
					aria-label="Go to previous page"
					onClick={() => onPageChange(currentPage - 1)}
				>
					Previous
				</button>
				{itemCount > 0 && pageItems.map((item) => (
					typeof item === 'number' ? (
						<button
							key={item}
							className="pagination__button pagination__number"
							type="button"
							aria-label={`Go to page ${item}`}
							aria-current={item === currentPage ? 'page' : undefined}
							onClick={() => onPageChange(item)}
						>
							{item}
						</button>
					) : (
						<span key={item} className="pagination__ellipsis" aria-hidden="true">…</span>
					)
				))}
				<button
					className="pagination__button"
					type="button"
					disabled={currentPage >= pageCount || itemCount === 0}
					aria-label="Go to next page"
					onClick={() => onPageChange(currentPage + 1)}
				>
					Next
				</button>
			</div>
		</nav>
	)
}

export default Pagination