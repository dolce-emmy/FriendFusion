import {Schema, model} from 'mongoose';

const postSchema = new Schema({

    description: String,
    userId: {typeof: Schema.Types.ObjectId, ref: 'User'},
    comments: [{typeof: Schema.Types.ObjectId, ref: 'Comment'}],
    // here I am using the userId as the reference to the user who liked the post
   likes: [{typeof: Schema.Types.ObjectId, ref: 'userId'}],
    picturePath: [{typeof: Schema.Types.ObjectId, ref: 'Image'}],
   

},
 {timestamps: true}

);

const PostCollection = model('Post', postSchema);

export default PostCollection;

