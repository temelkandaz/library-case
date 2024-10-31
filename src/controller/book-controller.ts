import { Request, Response, NextFunction } from "express";
import { catchError } from "./decorator/catch-error";

class BookController {

    @catchError
    async createBookByName(req: Request, res: Response, next: NextFunction) {
        const name = req.body.name;
        // check if name exists
        
        const book = await req.db.Book.create({ name });
        
        res.send(book);
    }

    @catchError
    async getBooks(req: Request, res: Response, next: NextFunction) {    
        const books = await req.db.Book.findAll();
            
        res.send(books);
    }

    @catchError
    async getBookById(req: Request, res: Response, next: NextFunction) {
        const bookId = req.params.id;
          
        const book = await req.db.Book.findByPk(bookId);

        // check book exists
            
        res.send(book);
    }
}

export default BookController;