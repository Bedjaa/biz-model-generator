const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv-safe');
const { z } = require('zod');
const sanitizeHtml = require('sanitize-html');
const Sentry = require('@sentry/node');
const OpenAI = require('openai');

dotenv.config();

Sentry.init({ dsn: process.env.SENTRY_DSN || '' });

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
      },
    },
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ['POST'],
  })
);

app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 5 });
app.use('/api/generate', limiter);

const ideaSchema = z.object({ idea: z.string().trim().min(1).max(500) });

app.post('/api/generate', async (req, res, next) => {
  try {
    const { idea } = ideaSchema.parse(req.body);
    const cleanIdea = sanitizeHtml(idea);
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const messages = [
      {
        role: 'user',
        content: `Create a detailed business analysis for the following idea.\n\nBusiness Idea: ${cleanIdea}\n\nProvide:\n1. SWOT analysis\n2. Pricing model suggestions\n3. Go-to-market channels`,
      },
    ];
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });
    const text = sanitizeHtml(response.choices[0].message.content.trim());
    res.json({ text });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res) => {
  Sentry.captureException(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
