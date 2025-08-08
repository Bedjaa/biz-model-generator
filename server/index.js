const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv-safe');
const xss = require('xss');
const OpenAI = require('openai');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 10 });
app.use('/api/', limiter);

app.post('/api/generate', async (req, res, next) => {
  try {
    const idea = typeof req.body.idea === 'string' ? req.body.idea : '';
    const cleanIdea = xss(idea).trim().slice(0, 500);
    if (!cleanIdea) {
      return res.status(400).json({ error: 'Idea is required' });
    }

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

    const text = xss(response.choices[0].message.content.trim());
    res.json({ text });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
