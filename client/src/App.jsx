import { useState } from 'react';
import DOMPurify from 'dompurify';

export default function App() {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setResult(DOMPurify.sanitize(data.text));
    } catch {
      setError('Error generating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <form onSubmit={submit} className="space-y-2">
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Business idea..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {result && (
        <div className="border rounded p-4 whitespace-pre-line">{result}</div>
      )}
    </div>
  );
}
