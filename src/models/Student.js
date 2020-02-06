import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
    enrollNumber: String,
    name: String,
    lastnames: String,
    university: String,
    car: String,
    city: String,
    photo: String,
    password: String,
    phone: String,
    raiting: Number,
    latitude: Number,
    longitude: Number,
    status: Number
});


export default model('Student', studentSchema);