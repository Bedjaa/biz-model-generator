import DOMPurify from 'dompurify';
import { Card, Button } from './ui.jsx';
import { motion } from 'framer-motion';

export default function ResultCard({ result }) {
  const sanitized = DOMPurify.sanitize(result);
  const copy = () => navigator.clipboard.writeText(sanitized);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-4 space-y-2">
        <pre className="whitespace-pre-wrap">{sanitized}</pre>
        <Button aria-label="Copy to clipboard" onClick={copy}>
          Copy
        </Button>
      </Card>
    </motion.div>
  );
}
