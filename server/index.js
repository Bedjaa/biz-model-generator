const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv-safe');
const { z } = require('zod');
const Sentry = require('@sentry/node');
const OpenAI = require('openai');
const sanitize = require('./utils/sanitize');

dotenv.config({ allowEmptyValues: true });

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

const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (process.env.ALLOW_DEV_ORIGIN === 'true') return cb(null, true);
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed'), false);
    },
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
    const cleanIdea = sanitize(idea);
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
    const text = sanitize(response.choices[0].message.content.trim());
    res.json({ text });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  Sentry.captureException(err);
  const status = err instanceof z.ZodError ? 400 : 500;
  res.status(status).json({ error: status === 400 ? 'Invalid request' : 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
