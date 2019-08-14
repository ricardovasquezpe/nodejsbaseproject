import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name		 : {
        type: String,
        required: 'Enter a first name'
    },
    lastname	 : {
        type: String,
        required: 'Enter a last name'
    },
    username	 : { type: String, required: true, unique: true },
    password	 : String,
    email		 : { type: String, required: true, unique: true },
    type		 : String,
    birthdate	 : Date,
    created_at   : Date,
    updated_at   : Date
});