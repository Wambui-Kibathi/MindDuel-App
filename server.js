// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

// Enable CORS so your frontend on Vercel can fetch from Render backend
server.use(cors());
server.use(middlewares);
server.use(router);

// Use the PORT provided by Render, or default to 3000 locally
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
