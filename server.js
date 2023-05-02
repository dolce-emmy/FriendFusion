import express from 'express';
import mongoose from 'mongoose';
//import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
// import fileUpload from 'express-fileupload';

// we will import the routes here


// app config


dotenv.config();

console.log(process.env)

const app = express();



// middlewares
app.use(express.json());
app.use(morgan('dev'));

// app.use(cors({exposedHeaders: ['token']}));
// app.use(fileUpload({
//     useTempFiles: true
// }));

mongoose
.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});

// routes


// listen
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});