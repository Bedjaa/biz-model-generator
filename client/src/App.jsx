import { useState } from 'react';

export default function App() {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');
      setResult(data.text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="mb-4 text-center text-3xl font-bold">Business Model Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full rounded-md border p-3"
            placeholder="Describe your business idea..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            maxLength={500}
            required
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {result && (
          <div className="mt-6 whitespace-pre-line rounded-md bg-white p-4 shadow">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
