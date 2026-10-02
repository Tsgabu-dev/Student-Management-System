import type { ReactNode } from 'react'
import EmptyState from './EmptyState'
import Loading from './Loading'
import './Table.css'

export type TableColumn<Row> = {
	key: string
	header: ReactNode
	 render: (row: Row) => ReactNode
	align?: 'start' | 'end'
}

type TableProps<Row> = {
	columns: TableColumn<Row>[]
	rows: Row[]
	getRowKey: (row: Row) => string | number
	caption: string
	isLoading?: boolean
	loadingLabel?: string
	emptyState?: ReactNode
}

function Table<Row>({
	columns,
	rows,
	getRowKey,
	caption,
	isLoading = false,
	loadingLabel = 'Loading rows',
	emptyState,
}: TableProps<Row>) {
	return (
		<div className="table__scroll">
			<table className="table__element" aria-busy={isLoading || undefined}>
				<caption className="table__caption">{caption}</caption>
				<thead>
					<tr>
						{columns.map((column) => (
							<th
								key={column.key}
								scope="col"
								className={column.align === 'end' ? 'table__cell--end' : undefined}
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td className="table__message" colSpan={columns.length}>
								<Loading label={loadingLabel} />
							</td>
						</tr>
					) : rows.length > 0 ? (
						rows.map((row) => (
							<tr key={getRowKey(row)}>
								{columns.map((column) => (
									<td
										key={column.key}
										className={column.align === 'end' ? 'table__cell--end' : undefined}
									>
										{column.render(row)}
									</td>
								))}
							</tr>
						))
					) : (
						<tr>
							<td className="table__message" colSpan={columns.length}>
								{emptyState ?? <EmptyState title="No records found" />}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Table