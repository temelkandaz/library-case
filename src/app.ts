import { Op } from "sequelize";
import db from "./database/config";
import Book from "./database/models/Book";

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

  const records = await db.Record.findAll({
    include: [{
      model: Book,
      attributes: ['id', 'name', 'rating']
    }]
  });

  const borrowedRecords = records.filter(record => record.status == "BORROWED"); 
  const returnedRecords = records.filter(record => record.status == "RETURNED");

  const borrowedBooks = borrowedRecords.map(borrowedRecord => {
    return borrowedRecord.Book;
  });

  const returnedBooks = returnedRecords.map(returnedRecord => {
    return returnedRecord.Book;
  });

  const resp = {
    id: user.id,
    name: user.name,
    borrowed_books: borrowedBooks,
    returned_books: returnedBooks
  }

  console.log(resp);

  res.send(resp);
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

app.post('/users/:userId/borrow/:bookId', async (req, res) => {
  const userId = req.params.userId;

  const user = await db.User.findByPk(userId);

  const bookId = req.params.bookId;
  
  const book = await db.Book.findByPk(bookId);
  
  const record = await db.Record.create({
    userId,
    bookId,
    status: "BORROWED",
    rating: null
  });

  book.status = "BORROWED";
  await book.save();

  res.send(record);
});

app.post('/users/:userId/return/:bookId', async (req, res) => {
  const userId = req.params.userId;

  const user = await db.User.findByPk(userId);

  const bookId = req.params.bookId;
  
  const book = await db.Book.findByPk(bookId);

  const score = req.body.score;

  const record = await db.Record.findOne({
    where: { userId, bookId, status: 'BORROWED' },
  });

  record.returnDate = new Date();
  record.status = "RETURNED";
  record.rating = score;
  await record.save();

  book.status = "AVAILABLE";

  const borrowRecords = await db.Record.findAll({
    where: { bookId, rating: { [Op.ne]: null } }
  });

  const total = borrowRecords.reduce((sum, item) => sum + item.rating, 0);
  const avgRating = borrowRecords.length ? total / borrowRecords.length : 0;

  book.rating = avgRating;

  await book.save();

  res.send(record);
});

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
      console.log("server is successfully running!");
    });
});
