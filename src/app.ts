import db from "./database/config";

const express = require('express');

const app = express();
const PORT = 3000;

db.sequelize.authenticate()
 .then(() => console.log('Database connected'))
 .catch((err) => console.error('Error connecting to database:', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the REST API! 1');
});

app.post('/users', async (req, res) => {
  const name = req.body.name;
  console.log("name: " + name);

  const user = await db.User.create({ name });
  
  res.send(user);
});

app.get('/users', async (req, res) => {
  const users = await db.User.findAll();

  console.log(JSON.stringify(users));
  
  res.send(users);
});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  const user = await db.User.findByPk(userId);

  console.log(JSON.stringify(user));
  
  res.send(user);
});

app.post('/books', async (req, res) => {
  const name = req.body.name;
  console.log("name: " + name);

  const book = await db.Book.create({ name });
  
  res.send(book);
});

app.get('/books', async (req, res) => {
  const books = await db.Book.findAll();

  console.log(JSON.stringify(books));
  
  res.send(books);
});

app.get('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  const book = await db.Book.findByPk(bookId);

  console.log(JSON.stringify(book));
  
  res.send(book);
});

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
      console.log("server is successfully running!");
    });
});
