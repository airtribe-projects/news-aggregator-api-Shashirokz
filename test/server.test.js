const tap = require('tap');
const supertest = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const server = supertest(app);

const mockUser = {
    name: 'Clark Kent',
    email: 'clark@superman.com',
    password: 'Krypt()n8',
    preference: 'movies',
    role: 'user'
};

let token = jwt.sign({ email: mockUser.email, id: 'mockUserId', role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

tap.test('POST /users/register', async (t) => {
    const response = await server.post('/apis/v1/users/register').send(mockUser);
    t.equal(response.status, 200);
    t.end();
});

tap.test('POST /users/register with missing email', async (t) => {
    const response = await server.post('/apis/v1/users/register').send({
        name: mockUser.name,
        password: mockUser.password
    });
    t.equal(response.status, 400);
    t.end();
});

tap.test('POST /users/login', async (t) => {
    const response = await server.post('/apis/v1/users/login').send({
        email: mockUser.email,
        password: mockUser.password
    });
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'token');
    token = response.body.token;
    t.end();
});

tap.test('POST /users/login with wrong password', async (t) => {
    const response = await server.post('/apis/v1/users/login').send({
        email: mockUser.email,
        password: 'wrongpassword'
    });
    t.equal(response.status, 401);
    t.end();
});

// Preferences tests

tap.test('GET /users/preference', async (t) => {
    const response = await server.get('/apis/v1/users/preference').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'preference');
    t.same(response.body.preference, mockUser.preference);
    t.end();
});

tap.test('GET /users/preference without token', async (t) => {
    const response = await server.get('/apis/v1/users/preference');
    t.equal(response.status, 401);
    t.end();
});

tap.test('PUT /users/preference', async (t) => {
    const response = await server.put('/apis/v1/users/preference').set('Authorization', `Bearer ${token}`).send({
        preference: 'movies'
    });
    t.equal(response.status, 200);
    t.end();
});

tap.test('Check PUT /users/preferences', async (t) => {
    const response = await server.get('/apis/v1/users/preference').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.same(response.body.preference, 'movies');  // Array comparison
    t.end();
});

// News tests

tap.test('GET /news', async (t) => {
    const response = await server.get('/apis/v1/news').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'news');
    t.end();
});

tap.test('GET /news without token', async (t) => {
    const response = await server.get('/apis/v1/news');
    t.equal(response.status, 401);
    t.end();
});

tap.teardown(() => {
    process.exit(0);
});
