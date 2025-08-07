import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IdeaForm from '../IdeaForm.jsx';
import { describe, it, expect, vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve({ text: 'ok' }) })
);

describe('IdeaForm', () => {
  it('submits idea', async () => {
    const onResult = vi.fn();
    render(<IdeaForm onResult={onResult} onError={() => {}} setLoading={() => {}} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'My idea' } });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(onResult).toHaveBeenCalled());
  });
});
