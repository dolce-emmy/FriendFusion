import express from 'express';
import { getAllPost } from '../controllers/postsController.js';

const app = express.Router();




//getAllPOst//

app.get ('/', getAllPost);


// for delete post//

app.delete('/:Id',);


//get all single post//

app.post('/:id',);


// for new post//

app.post('/', );

// update post//


app.patch('/:id', );

//like post //


app.get('/:id',);







