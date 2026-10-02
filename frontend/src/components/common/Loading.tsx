import './Loading.css'

type LoadingProps = {
	label?: string
	size?: 'sm' | 'md'
}

function Loading({ label = 'Loading', size = 'md' }: LoadingProps) {
	return (
		<div className={`loading loading--${size}`} role="status" aria-live="polite">
			<span className="loading__spinner" aria-hidden="true" />
			<span>{label}</span>
		</div>
	)
}

export default Loading