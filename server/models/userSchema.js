import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        },
    location: {
        type: String,
    },
    occupation: {
        type: String,
    },
    mobile: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    picturePath: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image',
        },
    ],
    profileImage: {
        
        type:String,
    },

    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }, 
    ],

    viewedProfile: {
        type: Number,
    },

}, { timestamps: true });

userSchema.indexes({ email: 1 });

const UserCollection = model('User', userSchema);

export default UserCollection;
