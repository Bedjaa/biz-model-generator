# biz-model-generator

Minimal full-stack app that turns a business idea into a short analysis.

## Quick Start – Codespaces
1. Open Codespace and run:
   ```bash
   cd server
   cp .env.example .env
   # set OPENAI_API_KEY=sk-...
   npm install
   npm start
   ```
2. In a new terminal start the client:
   ```bash
   cd client
   npm install
   npm run dev
   ```
3. In PORTS set 5173 to Public, copy its URL.
4. Paste the URL into `server/.env` as `CLIENT_ORIGIN=<that URL>`.
5. Restart the server.

## Quick Start – Local
```bash
# backend
cd server && cp .env.example .env && npm install && npm start
# frontend
cd client && npm install && npm run dev
# open http://localhost:5173 (proxy to 3001)
```

## Config
- `OPENAI_API_KEY` – OpenAI key (server only)
- `CLIENT_ORIGIN` – allowed origin(s), comma‑separated
- `ALLOW_DEV_ORIGIN` – set `true` to allow any origin in dev
- `SENTRY_DSN` – optional error reporting

## Security
API keys stay in `server/.env`. Rotate immediately if leaked.

## Troubleshooting
- Tailwind/PostCSS error → `npm i -D tailwindcss @tailwindcss/postcss postcss`
- CORS error → set `CLIENT_ORIGIN` to your 5173 URL and restart server
- 401/429 from OpenAI → check API key / rate limit
- Port in use → change port or kill process

## License
MIT
