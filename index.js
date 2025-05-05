import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/books', bookRoute);
// app.use(cors({
//     origins:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to my project');
});

app.get('/checkConnection',(req,res)=>{
    res.json({message: "Backend is live, but Frontend needs configuration"});
});


mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to MongoDB!');
        app.listen(PORT, () => {
            console.log(`App is listening on Port: ${PORT}`);
        });
    }).catch((err) => {
        console.log(err);
    });