import express from "express";
const router = express.Router();

import {
  createBook
  
 
 , getBooks,
 getBook,
 deleteBook,
 updateBook,
 getBooksBySearch

} from "../controllers/book.js";


router.post("/",createBook);
router.get("/all", getBooks);
router.get("/single/:id", getBook);
router.delete("/:id", deleteBook);
router.patch("/:id", updateBook);

router.get("/search",getBooksBySearch)

export default router;
