
import mongoose from "mongoose";
import BookModal from "../models/book.js";

export const createBook = async (req, res) => {
  const book = req.body;
  // book.category=book.category.tolowercase()
  try {
  const newBook = await BookModal.create({
    ...book
   
  });

    res.status(201).json(newBook);
   } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBooks = async (req, res) => {
  const { page,category,sort } = req.query;
  
  let q={},s={}
  if(category){
    q.category=category
  }
  if(sort){
    s.price=sort
     }
  // console.log(q,s,page)

  try {

    // const books = await BookModal.find(q).sort(s).collation({locale:"en_US", numericOrdering:true}).limit(10);
    // res.status(200).json({data:books});

    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await BookModal.countDocuments(q);
    const books = await BookModal.find(q).sort(s).collation({locale:"en_US", numericOrdering:true}).limit(limit).skip(startIndex);
    res.json({
      data: books,
      currentPage: Number(page),
      totalBooks: total,  
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModal.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};


export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No Book exist with id: ${id}` });
    }
    await BookModal.findByIdAndRemove(id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { author, title, poster,category,price,discount  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No Book exist with id: ${id}` });
    }

    const updatedBook = {
      author, title, poster,category,price,discount ,
      _id: id,
    };
    console.log(updateBook)
    await BookModal.findByIdAndUpdate(id, updatedBook, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBooksBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  // console.log("yes")
  
    const title = new RegExp(searchQuery, "i");
    // console.log(title)
    const books = await BookModal.find({ title });
    res.json(books);
 
};
