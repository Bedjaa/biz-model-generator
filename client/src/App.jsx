import { useState } from 'react';

export default function App() {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('Loading...');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      });
      const data = await response.json();
      setResult(data.text);
    } catch (err) {
      setResult('Error: ' + err.message);
    }
  };

  return (
    <div>
      <h1>Biz Model Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your business idea"
        />
        <button type="submit">Generate</button>
      </form>
      <pre>{result}</pre>
    </div>
  );
}
