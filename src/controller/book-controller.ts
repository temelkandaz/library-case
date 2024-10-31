import { Request, Response, NextFunction } from "express";
import { catchError } from "./decorator/catch-error";
import { LibraryAppError } from "../error/LibraryAppError";
import { LibraryAppErrorCode } from "../error/LibraryAppErrorCode";
import { Op } from "sequelize";

class BookController {
  @catchError
  async createBookByName(req: Request, res: Response, next: NextFunction) {
    const name = req.body.name;
    const existingBook = await req.db.Book.findOne({
      where: { name: { [Op.eq]: name } },
    });

    if (existingBook) {
      throw new LibraryAppError(
        LibraryAppErrorCode.NAME_IS_ALREADY_IN_USE_FOR_BOOK,
        "name is currently in use.",
      );
    }

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

    res.send(book);
  }
}

export default BookController;
