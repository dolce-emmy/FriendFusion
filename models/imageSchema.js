import {Schema, model} from 'mongoose';

const imageSchema = new Schema({

    name: String,
    size: Number,
    url: String,
    contentType: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

const ImageCollection = model('Image', imageSchema);

export default ImageCollection;