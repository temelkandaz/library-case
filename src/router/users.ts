import { Router } from 'express';
import Book from '../database/models/Book';
import { Op } from 'sequelize';
import { 
  validateBorrowBookInput, 
  validateCreateUserInput, 
  validateGetUserOrBookInput, 
  validateReturnBookInput 
} from '../validation/validation';
import { validateRequest } from '../middleware/request-validator';

const router = Router();

router.post('/', validateCreateUserInput, validateRequest, async (req, res, next) => {
    try {
        const name = req.body.name;
        console.log("name: " + name);
      
        const user = await req.db.User.create({ name });
        
        res.send(user);
    }
    catch (error) {
        next(error);
    }
});
  
router.get('/', async (req, res, next) => {
    try {
        const users = await req.db.User.findAll();
    
        console.log(JSON.stringify(users));
      
        res.send(users);
    } 
    catch (error) {
        next(error);
    }
});

router.get('/:id', validateGetUserOrBookInput, validateRequest, async (req, res, next) => {
    try {
        const userId = req.params.id;
      
        const user = await req.db.User.findByPk(userId);
      
        const records = await req.db.Record.findAll({
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
    }
    catch (error) {
        next(error);
    }
});

router.post('/:userId/borrow/:bookId', validateBorrowBookInput, validateRequest, async (req, res, next) => {
    try {
        const userId = req.params.userId;
    
        const user = await req.db.User.findByPk(userId);
    
        const bookId = req.params.bookId;
    
        const book = await req.db.Book.findByPk(bookId);
    
        const record = await req.db.Record.create({
          userId,
          bookId,
          status: "BORROWED",
          rating: null
        });
    
        book.status = "BORROWED";
        await book.save();
    
        res.send(record);
    }
    catch (error) {
        next(error);
    }
});
  
router.post('/:userId/return/:bookId', validateReturnBookInput, validateRequest, async (req, res, next) => {
    try {
        const userId = req.params.userId;
  
        const user = await req.db.User.findByPk(userId);
      
        const bookId = req.params.bookId;
        
        const book = await req.db.Book.findByPk(bookId);
      
        const score = req.body.score;
      
        const record = await req.db.Record.findOne({
          where: { userId, bookId, status: 'BORROWED' },
        });
      
        record.returnDate = new Date();
        record.status = "RETURNED";
        record.rating = score;
        await record.save();
      
        book.status = "AVAILABLE";
      
        const borrowRecords = await req.db.Record.findAll({
          where: { bookId, rating: { [Op.ne]: null } }
        });
      
        const total = borrowRecords.reduce((sum, item) => sum + item.rating, 0);
        const avgRating = borrowRecords.length ? total / borrowRecords.length : 0;
      
        book.rating = avgRating;
      
        await book.save();
      
        res.send(record);
    }
    catch (error) {
        next(error);
    }
});

export default router;