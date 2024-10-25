import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../app';

describe('GET /api/tasks', () => {
  it('should return a list of tasks', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return a task by id', async () => {
    const response = await request(app).get('/api/tasks/1');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: true,
    });
  });
});

describe('POST /api/tasks', () => {
  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'New Task',
        description: 'New Task Description',
      });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: 4,
      title: 'New Task',
      description: 'New Task Description',
      completed: false,
    });
  });
});

describe('PATCH /api/tasks/:id', () => {
  it('should update a task by id', async () => {
    const response = await request(app)
      .patch('/api/tasks/1')
      .send({
        title: 'Updated Task',
        description: 'Updated Task Description',
      });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 1,
      title: 'Updated Task',
      description: 'Updated Task Description',
      completed: true,
    });
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('should delete a task by id', async () => {
    const response = await request(app).delete('/api/tasks/3');
    expect(response.status).toBe(204);
  });

  it('should return 404 if task not found', async () => {
    const response = await request(app).delete('/api/tasks/100');
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      message: 'Task not found with id: 100',
    });
  });
});
