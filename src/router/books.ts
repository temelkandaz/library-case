import { Router } from "express";
import { 
    validateCreateBookInput, 
    validateGetUserOrBookInput 
} from "../validation/validation";
import { validateRequest } from "../middleware/request-validator";

const router = Router();

router.post('/', validateCreateBookInput, validateRequest, async (req, res, next) => {
    try {
        const name = req.body.name;
        console.log("name: " + name);
      
        const book = await req.db.Book.create({ name });
        
        res.send(book);
    } 
    catch (error) {
        next(error);
    }
});
  
router.get('/', async (req, res, next) => {
    try {
        const books = await req.db.Book.findAll();
      
        console.log(JSON.stringify(books));
        
        res.send(books);
    }
    catch (error) {
        next(error);
    }
});
  
router.get('/:id', validateGetUserOrBookInput, validateRequest, async (req, res, next) => {
    try {
        const bookId = req.params.id;
      
        const book = await req.db.Book.findByPk(bookId);
      
        console.log(JSON.stringify(book));
        
        res.send(book);
    }
    catch (error) {
        next(error);
    }
});

export default router;