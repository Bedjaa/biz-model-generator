/* eslint-env jest */
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const OpenAI = require('openai');

fs.writeFileSync(
  path.join(__dirname, '..', '.env'),
  'OPENAI_API_KEY=test\nCLIENT_ORIGIN=http://localhost\nSENTRY_DSN=test\n'
);

afterAll(() => {
  fs.unlinkSync(path.join(__dirname, '..', '.env'));
});

jest.mock('openai');
OpenAI.mockImplementation(() => ({
  chat: {
    completions: {
      create: async () => ({ choices: [{ message: { content: 'safe response' } }] }),
    },
  },
}));

const app = require('..');

describe('POST /api/generate', () => {
  it('returns sanitized text', async () => {
    const res = await request(app).post('/api/generate').send({ idea: '<b>test</b>' });
    expect(res.status).toBe(200);
    expect(res.body.text).toBe('safe response');
  });
});
