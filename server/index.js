// Run `npm install` to install dependencies.
// Set your OpenAI API key in a `.env` file based on `.env.example`.
// Start the server with `npm start` (listens on port 3001).

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  const { idea } = req.body;
  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  const openai = new OpenAIApi(configuration);

  const prompt = `Create a detailed business analysis for the following idea.\n\nBusiness Idea: ${idea}\n\nProvide:\n1. SWOT analysis\n2. Pricing model suggestions\n3. Go-to-market channels`;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 500,
      temperature: 0.7,
    });
    res.json({ text: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
