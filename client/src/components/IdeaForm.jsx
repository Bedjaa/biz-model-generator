import { useState } from 'react';
import DOMPurify from 'dompurify';
import { z } from 'zod';
import { Input, Button } from './ui.jsx';
import { trackEvent } from '../analytics';
import { useTranslation } from 'react-i18next';

const schema = z.string().trim().min(1).max(500);

export default function IdeaForm({ onResult, onError, setLoading }) {
  const [idea, setIdea] = useState('');
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanIdea = DOMPurify.sanitize(idea);
    const parsed = schema.safeParse(cleanIdea);
    if (!parsed.success) {
      onError(t('errors.invalid'));
      return;
    }
    setLoading(true);
    try {
      trackEvent('idea_submitted');
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: parsed.data }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      trackEvent('analysis_received');
      onResult(data.text);
    } catch (err) {
      trackEvent('error_occurred');
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        aria-label={t('idea_placeholder')}
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        required
        maxLength={500}
      />
      <Button type="submit">{t('generate')}</Button>
    </form>
  );
}
