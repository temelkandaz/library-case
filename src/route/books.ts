import { Router } from "express";

const router = Router();

router.post('/', async (req, res) => {
    const name = req.body.name;
    console.log("name: " + name);
  
    const book = await req.db.Book.create({ name });
    
    res.send(book);
});
  
router.get('/', async (req, res) => {
    const books = await req.db.Book.findAll();
  
    console.log(JSON.stringify(books));
    
    res.send(books);
});
  
router.get('/:id', async (req, res) => {
    const bookId = req.params.id;
  
    const book = await req.db.Book.findByPk(bookId);
  
    console.log(JSON.stringify(book));
    
    res.send(book);
});

export default router;