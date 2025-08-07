export default function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <div role="alert" className="bg-red-100 text-red-800 p-2 rounded">
      {message}
    </div>
  );
}
