export default function Input({ label, name, type = "text", value, onChange, onBlur, error, touched, ...rest }) {
    const showError = Boolean(touched && error)

    return (
        <label className="field">
            <span className="label">{label}</span>

            <input
                className={showError ? "input input-error" : "input"}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={showError}
                aria-describedby={showError ? `${name}-error` : undefined}
                {...rest}
            />

            {showError && (
                <span className="error" id={`${name}-error`}>
                    {error}
                </span>
            )}
        </label>
    )
}