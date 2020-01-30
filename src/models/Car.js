import { Schema, model } from 'mongoose';

const carSchema = new Schema({
    brand: String,
    model: String,
    license: String,
    color: String,
    year: Number,
    spaceInCar: Number,
    status: Number,
    plates: String,
});


export default model('Car', carSchema);