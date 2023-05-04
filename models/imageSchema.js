import {Schema, model} from 'mongoose';

const imageSchema = new Schema({

    fileName: String,
    fileSize: Number,
    filePath: String,
    contentType: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},


})

const ImageCollection = model('Image', imageSchema);

export default ImageCollection;