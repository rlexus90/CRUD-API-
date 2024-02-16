const  supertest =require('supertest');
const dotenv = require('dotenv');

dotenv.config();

const serverUrl = `http://localhost:${process.env.PORT}`;
const user = { 
username: 'Test User',
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

let id = '';

res3.body.map((el)=>{
  if(el.username === 'Test User') id = el.id;
})
const res4 = await req.get(`/api/users/${id}`);
expect(res4.body.username).toBe('Test User');

const res5 = await req.delete(`/api/users/${id}`);
expect(res5.status).toBe(204);

const res6 = await req.get(`/api/users/${id}`);
expect(res6.status).toBe(404);

})


