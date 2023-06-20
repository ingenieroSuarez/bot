const request = require('supertest');
const app = require('../../index');

describe('GET/Messages', () => {
  it('debería devolver una lista de mensajes', async () => {
    const response = await request(app).get('/api/canal/whatsapp/messages');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});