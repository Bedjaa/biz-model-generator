import { useState, lazy, Suspense } from 'react';
import DOMPurify from 'dompurify';
import Layout from './components/Layout.jsx';
import IdeaForm from './components/IdeaForm.jsx';
import ResultCard from './components/ResultCard.jsx';
import Loader from './components/Loader.jsx';
import ErrorAlert from './components/ErrorAlert.jsx';

const HistoryPanel = lazy(() => import('./components/HistoryPanel.jsx'));

export default function App() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleResult = (text) => {
    const clean = DOMPurify.sanitize(text);
    setResult(clean);
    const stored = JSON.parse(localStorage.getItem('history') || '[]');
    const updated = [clean, ...stored].slice(0, 10);
    localStorage.setItem('history', JSON.stringify(updated));
  };

  const toggleHistory = () => setHistoryOpen((x) => !x);

  return (
    <Layout
      history={
        <Suspense fallback={<div />}>
          <HistoryPanel isOpen={historyOpen} onClose={toggleHistory} />
        </Suspense>
      }
      toggleHistory={toggleHistory}
    >
      <ErrorAlert message={error} />
      <IdeaForm onResult={handleResult} onError={setError} setLoading={setLoading} />
      {loading && <Loader />}
      {result && <ResultCard result={result} />}
    </Layout>
  );
}
