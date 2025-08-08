# Biz Model Generator

A secure full-stack application that turns business ideas into structured insights such as SWOT analysis, pricing models and go-to-market channels.

- **Server:** Node.js + Express
- **Client:** React + Vite + Tailwind CSS

## Quick Start

### 1. Server
```bash
cd server
cp .env.example .env
# add your OPENAI_API_KEY and adjust CLIENT_ORIGIN if needed
npm install
npm run dev
```
The server runs on `http://localhost:3001`.

### 2. Client
```bash
cd client
npm install
npm run dev
```
The Vite dev server runs on `http://localhost:5173` and proxies `/api` requests to the backend.

## Environment variables

`server/.env` should contain:
```
PORT=3001
OPENAI_API_KEY=your_openai_api_key
CLIENT_ORIGIN=http://localhost:5173
```

## Security Features
- Helmet for HTTP headers
- CORS restricted to the configured client origin
- Rate limiting on API routes
- Request body size limits
- XSS sanitization of user input
- Environment variables validated with dotenv-safe

## Testing

From the repository root run:
```bash
npm test
```

## GitHub Codespaces

This project works in GitHub Codespaces. After opening a codespace:
```
npm install
npm -w server run dev
npm -w client run dev
```

Happy hacking!
