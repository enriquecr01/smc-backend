import { Schema, model } from 'mongoose';

const universitySchema = new Schema({
    acronym: String,
    name: String,
    latitude: Number,
    longitude: Number
});


export default model('University', universitySchema);