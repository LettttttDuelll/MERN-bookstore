import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//route for search by name or author
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;

        let filter = {};

        if (q) {
            filter = {
                $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { author: { $regex: q, $options: 'i' } }
                ]
            };
        }

        const books = await Book.find(filter);

        return res.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


//route for save a new book
router.post('/', async (req, res)=>{
    try {
        if(
            !req.body.title||!req.body.author||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:'Send all required fields: title, author, publishYear',
            });
        }
        const newBook={
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//Route for get all books from database
router.get('/', async(req,res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count:books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//Route for get 1 books from database by id
router.get('/:id', async(req,res)=>{
    try {

        const {id}= req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Route for update a book
router.put('/:id', async(req,res)=>{
    try {
         if(
            !req.body.title||!req.body.author||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message:'Send all required fields: title, author, publishYear',
            });
        }

        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(400).json({message: 'Book not found'});
        }

        return res.status(200).send({message: 'Book update successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//Route for delete a book
router.delete('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(400).json({message: 'Book not found'});
        }

        return res.status(200).send({message: 'Book deleted successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});



export default router;