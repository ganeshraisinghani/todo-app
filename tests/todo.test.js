const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Todo = require('/models/Todo');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await Todo.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Todo API', () => {
  it('should create a todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Test todo', completed: false });

    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test todo');
  });
});
