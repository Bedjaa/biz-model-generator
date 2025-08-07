export function Input(props) {
  return <input {...props} className={`border p-2 rounded w-full ${props.className || ''}`} />;
}

export function Button({ children, className = '', ...rest }) {
  return (
    <button
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = '' }) {
  return <div className={`border rounded p-2 bg-white dark:bg-gray-800 ${className}`}>{children}</div>;
}
