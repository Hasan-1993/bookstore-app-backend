import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Send all required fields: Title, Author and Published Year!" })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const allBooks = await Book.find();
        return res.status(200).json({
            count: allBooks.length,
            data: allBooks
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Send all the required fields to update the book: Title, Author and PublishYear!" });
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({message:'Book with this ID not found !'});
        }
        return res.status(200).send({message:'Book updated succesfully!'});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.messsage });
    }
});

router.delete('/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:"Book with this ID not found inthe records !"});
        }
        return res.status(200).send({message:"Book deleted successfully !!"});
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;