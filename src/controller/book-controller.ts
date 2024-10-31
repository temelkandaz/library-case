import { Request, Response, NextFunction } from "express";

export class BookController {

    async createBookByName(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.body.name;

            // check if name exists
          
            const book = await req.db.Book.create({ name });
            
            res.send(book);
        } 
        catch (error) {
            next(error);
        }
    }

    async getBooks(req: Request, res: Response, next: NextFunction) {    
        try {
            const books = await req.db.Book.findAll();
            
            res.send(books);
        }
        catch (error) {
            next(error);
        }
    }

    async getBookById(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = req.params.id;
          
            const book = await req.db.Book.findByPk(bookId);

            // check book exists
            
            res.send(book);
        }
        catch (error) {
            next(error);
        }
    }
}