const  supertest =require('supertest');
const dotenv = require('dotenv');

dotenv.config();

const serverUrl = `http://localhost:${process.env.PORT}`;
const user = { 
username: 'test User',
age: 30,
hobbies:['testing'],
}

test('should ', async () => {
const req = supertest(serverUrl);
const res = await req.get('/api/users')
expect(res.status).toBe(200);
expect(res.body.length).toBe(2);

const res2= await req.post('/api/users').send(user);
expect(res2.status).toBe(201);

const res3 = await req.get('/api/users');
expect(res3.body.length).toBe(3);

const res4 = await req.get('/api/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
expect(res4.body.username).toBe('First User');

const res5 = await req.delete('/api/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
expect(res5.status).toBe(204);

const res6 = await req.get('/api/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d');
expect(res6.status).toBe(404);

})


