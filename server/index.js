import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

app.listen('5000', () => {
    console.log('Server has started on port 5000');

})