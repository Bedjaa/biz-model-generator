# biz-model-generator

Secure full-stack app for generating SWOT analyses, pricing models and go-to-market channels from user ideas.

## Project structure

- **server/** – Node.js + Express backend
- **client/** – React + Vite frontend

## Setup

### 1. Clone the repository
```bash
git clone <repo-url>
cd biz-model-generator
```

### 2. Configure the server
```bash
cd server
cp .env.example .env
# Edit .env and set OPENAI_API_KEY=YOUR_API_KEY_HERE
npm install
npm start
```
The server listens on [http://localhost:3001](http://localhost:3001).

### 3. Configure the client
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
The Vite dev server runs on [http://localhost:5173](http://localhost:5173) and proxies `/api` requests to the backend.

### 4. Tailwind & shadcn/ui
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Configuration is already provided in `tailwind.config.js`.

### 5. Obtain an OpenAI API key
Create an account at [OpenAI](https://platform.openai.com/), then generate an API key from your dashboard. Insert the key into `server/.env` as `OPENAI_API_KEY`.

## Tests
From the project root run all tests:
```bash
npm test
```

## Lint and build
```bash
npm run lint
npm run build
```

## Security
- Helmet with strict CSP
- CORS restricted to configured client origin
- Rate limiting on `/api/generate`
- Inputs validated and sanitized with Zod and DOMPurify
- Centralized error handling and Sentry reporting
