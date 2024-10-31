import { Router } from "express";
import { 
    validateCreateBookInput, 
    validateGetUserOrBookInput 
} from "../validation/validation";
import { validateRequest } from "../middleware/request-validator";
import BookController from "../controller/book-controller";

const router = Router();
const bookController = new BookController();

router.post('/', validateCreateBookInput, validateRequest, bookController.createBookByName);
  
router.get('/', bookController.getBooks);
  
router.get('/:id', validateGetUserOrBookInput, validateRequest, bookController.getBookById);

export default router;
