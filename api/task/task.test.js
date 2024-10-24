import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../app';

describe('GET /api/tasks', () => {
  it('should return a list of tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
