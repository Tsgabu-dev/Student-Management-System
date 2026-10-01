import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
import './Field.css'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	label?: string
	hint?: string
	error?: string
	leadingIcon?: ReactNode
	trailingIcon?: ReactNode
	wrapperClassName?: string
}

function Input({
	id,
	label,
	hint,
	error,
	leadingIcon,
	trailingIcon,
	wrapperClassName = '',
	className = '',
	disabled = false,
	required = false,
	...props
}: InputProps) {
	const generatedId = useId()
	const inputId = id ?? generatedId
	const hintId = hint ? `${inputId}-hint` : undefined
	const errorId = error ? `${inputId}-error` : undefined
	const describedBy = [props['aria-describedby'], hintId, errorId]
		.filter(Boolean)
		.join(' ') || undefined
	const controlClassName = [
		'field-control',
		error && 'field-control--error',
		disabled && 'field-control--disabled',
	]
		.filter(Boolean)
		.join(' ')

	return (
		<div className={['form-field', wrapperClassName].filter(Boolean).join(' ')}>
			{label && (
				<label className="form-field__label" htmlFor={inputId}>
					{label}
					{required && <span className="form-field__required" aria-hidden="true">*</span>}
				</label>
			)}
			<div className={controlClassName}>
				{leadingIcon && <span className="field-control__icon" aria-hidden="true">{leadingIcon}</span>}
				<input
					{...props}
					id={inputId}
					className={['field-control__input', className].filter(Boolean).join(' ')}
					disabled={disabled}
					required={required}
					aria-invalid={error ? true : props['aria-invalid']}
					aria-describedby={describedBy}
				/>
				{trailingIcon && <span className="field-control__icon" aria-hidden="true">{trailingIcon}</span>}
			</div>
			{hint && <span className="form-field__hint" id={hintId}>{hint}</span>}
			{error && <span className="form-field__error" id={errorId} role="alert">{error}</span>}
		</div>
	)
}

export default Input