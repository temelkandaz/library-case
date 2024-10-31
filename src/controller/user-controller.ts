import { Request, Response, NextFunction } from "express";
import Book from "../database/models/Book";
import { RecordStatus } from "../database/models/enums/RecordStatus";
import { Op } from "sequelize";
import { BookStatus } from "../database/models/enums/BookStatus";

export class UserController {

    async createUserByName(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.body.name;

            // check if name exists

            const user = await req.db.User.create({ name });
            
            res.send(user);
        }
        catch (error) {
            next(error);
        }
    } 

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await req.db.User.findAll();
          
            res.send(users);
        } 
        catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
          
            const user = await req.db.User.findByPk(userId);

            // check if user exists
          
            const records = await req.db.Record.findAll({
              include: [{
                model: Book,
                attributes: ['id', 'name', 'rating']
              }]
            });
          
            const borrowedRecords = records.filter(record => record.status == RecordStatus.BORROWED); 
            const returnedRecords = records.filter(record => record.status == RecordStatus.RETURNED);
          
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
          
            res.send(resp);
        }
        catch (error) {
            next(error);
        }
    }

    async borrowBookByUserIdAndBookId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
        
            const user = await req.db.User.findByPk(userId);


            // check if user exists
        
            const bookId = req.params.bookId;
        
            const book = await req.db.Book.findByPk(bookId);


            // check if book exists

            // check if book available
        
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
    }

    async returnBookByUserIdAndBookIdAndScore(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
      
            const user = await req.db.User.findByPk(userId);


            // check if user exists
          
            const bookId = req.params.bookId;
            
            const book = await req.db.Book.findByPk(bookId);


            // check if book exists
            // check if book borrowed
          
            const record = await req.db.Record.findOne({
              where: { userId, bookId, status: RecordStatus.BORROWED },
            });

            // check if record exists

            const score = req.body.score;

            record.returnDate = new Date();
            record.status = RecordStatus.RETURNED;
            record.rating = score;
            await record.save();
          
            book.status = BookStatus.AVAILABLE;
          
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
    }
}
