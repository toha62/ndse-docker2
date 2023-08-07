const express = require('express');
const redis = require('redis');

const PORT = process.env.PORT || 'locallhost';
const REDIS_URL = process.env.REDIS_URL || 'locallhost';

const app = express();
const clientDb = redis.createClient({ url: REDIS_URL });

(async () => {
  await clientDb.connect();
  console.log('Database connected');
  console.log('Redis URL: ', REDIS_URL);
})();

app.use(express.json());

app.get('/counter/:bookId', async (request, response) => {
  const { bookId } = request.params;
  
  const counter = await clientDb.get(bookId);

  response.json(counter);
});

app.post('/counter/:bookId/incr', async (request, response) => {
  const { bookId } = request.params;
  
  const counter = await clientDb.incr(bookId);

  response.json(counter);
});

app.listen(PORT, () => {
  console.log(`Counter listening port ${PORT}`);
});
