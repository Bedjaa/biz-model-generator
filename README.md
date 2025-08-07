# biz-model-generator

Full-stack app for generating SWOT analyses, pricing models and go-to-market channels from user ideas.

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

### 4. Obtain an OpenAI API key
Create an account at [OpenAI](https://platform.openai.com/), then generate an API key from your dashboard. Insert the key into `server/.env` as `OPENAI_API_KEY`.

### 5. Test in the browser
Navigate to [http://localhost:5173](http://localhost:5173), enter a business idea, and submit to generate the analysis.

## Quick Start

```bash
git clone <repo-url>
cd biz-model-generator
cp server/.env.example server/.env
# Edit server/.env and add your OpenAI API key
cd server && npm install && npm start &
cd ../client && npm install && npm run dev
```

## Running tests

Both the server and client include placeholder test scripts. From the project root run:

```bash
cd server && npm test
cd ../client && npm test
```

These commands currently print "No tests" and exit with an error code until real tests are added.
