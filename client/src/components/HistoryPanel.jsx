import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

export default function HistoryPanel({ isOpen, onClose }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('history')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(items));
  }, [items]);

  if (!isOpen) return null;

  return (
    <div className="space-y-2">
      <h2 className="font-bold">History</h2>
      <ul className="space-y-1 text-sm">
        {items.map((h, i) => (
          <li key={i}>{DOMPurify.sanitize(h)}</li>
        ))}
      </ul>
      <button onClick={onClose} className="border px-2 py-1 rounded">
        Close
      </button>
    </div>
  );
}
