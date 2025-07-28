import mongoose from "mongoose";
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";
import bookRoute from './routers/bookRoute.js'
import cors from 'cors';

const app = express();

//opption 1
app.use(cors());
//option 2
//app.use(
//   cors({
//        origin: 'http://localhost:3000',
//        methods: ['GET','POST','PUT','DELETE'],
//        allowedHeaders: ['Content-Type']
//    })
//);

//middleware for parsing request body
//test = postman
app.use(express.json());

app.get("/", (req, res) => {
    console.log(req.url);//de req rat dai
    return res.status(200).send('Welcome to Myyyyyy');
});

//make a defaul url, path, router or something
app.use('/books',bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('app conected to db');
        app.listen(PORT, () => {
            console.log(`app is listen to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('error');
    })