import { Request, Response, NextFunction } from "express";
import Book from "../database/models/Book";
import { RecordStatus } from "../database/models/enums/RecordStatus";
import { Op } from "sequelize";
import { BookStatus } from "../database/models/enums/BookStatus";
import { catchError } from "./decorator/catch-error";
import { LibraryAppError } from "../error/LibraryAppError";
import { LibraryAppErrorCode } from "../error/LibraryAppErrorCode";

class UserController {

    @catchError
    async createUserByName(req: Request, res: Response, next: NextFunction) {
        const name = req.body.name;
        const existingUser = await req.db.User.findOne(
            { where: { name: { [Op.eq]: name } }}
        );

        if (existingUser) {
            throw new LibraryAppError(
                LibraryAppErrorCode.NAME_IS_ALREADY_IN_USE_FOR_USER, 
                'name is currently in use.'
            );
        }

        const user = await req.db.User.create({ name });
            
        res.send(user);
    }

    @catchError
    async getUsers(req: Request, res: Response, next: NextFunction) {
        const users = await req.db.User.findAll();
        
        res.send(users);
    }

    @catchError
    async getUserById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        const user = await req.db.User.findByPk(userId);

        console.log(user);

        console.log(JSON.stringify(user));
        console.log(!user);

        if (!user) {
            res.send({});

            return;
        }
        
        const records = await req.db.Record.findAll({
            where: { userId },
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

    @catchError
    async borrowBookByUserIdAndBookId(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        const user = await req.db.User.findByPk(userId);

        if (!user) {
            throw new LibraryAppError(
                LibraryAppErrorCode.USER_NOT_FOUND_BY_ID, 
                'No user found with the provided id!'
            );
        };

        const bookId = req.params.bookId;
        const book = await req.db.Book.findByPk(bookId);

        if (!book) {
            throw new LibraryAppError(
                LibraryAppErrorCode.BOOK_NOT_FOUND_BY_ID, 
                'No book found with the provided id!'
            );
        }

        if (book.status != BookStatus.AVAILABLE) {
            throw new LibraryAppError(
                LibraryAppErrorCode.NOT_AVAILABLE_TO_BORROW, 
                'Book is not available to be borrowed!'
            );
        }
    
        const record = await req.db.Record.create({
          userId,
          bookId,
          status: RecordStatus.BORROWED,
          rating: null
        });
    
        book.status = BookStatus.BORROWED;
        await book.save();
    
        res.send(record);
    }

    @catchError
    async returnBookByUserIdAndBookIdAndScore(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        const user = await req.db.User.findByPk(userId);

        if (!user) {
            throw new LibraryAppError(
                LibraryAppErrorCode.USER_NOT_FOUND_BY_ID, 
                'No user found with the provided id!'
            );
        };
        
        const bookId = req.params.bookId;
        const book = await req.db.Book.findByPk(bookId);
        
        if (!book) {
            throw new LibraryAppError(
                LibraryAppErrorCode.BOOK_NOT_FOUND_BY_ID, 
                'No book found with the provided id!'
            );
        }

        if (book.status != BookStatus.BORROWED) {
            throw new LibraryAppError(
                LibraryAppErrorCode.NOT_SUITABLE_TO_RETURN, 
                'Book is not borrowed at the moment, hence, not suitable for return!'
            );
        }

        const record = await req.db.Record.findOne({
          where: { userId, bookId, status: RecordStatus.BORROWED },
        });

        if (!record) {
            throw new LibraryAppError(
                LibraryAppErrorCode.NO_RECORD_FOUND_WITH_PROVIDED_INFO, 
                'No record could be found with the provided information!'
            );
        }
        
        const score = req.body.score;
        record.returnDate = new Date();
        record.status = RecordStatus.RETURNED;
        record.rating = score;
        await record.save();
        
        book.status = BookStatus.AVAILABLE;
        
        const records = await req.db.Record.findAll({
          where: { bookId, rating: { [Op.ne]: null } }
        });
        
        const total = records.reduce((sum, item) => sum + item.rating, 0);
        const avgRating = records.length ? total / records.length : 0;
        
        book.rating = avgRating;
        
        await book.save();
        
        res.send(record);
    }
}

export default UserController;