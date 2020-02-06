import { Schema, model } from 'mongoose';

const spotSchema = new Schema({
    driver: String,
    latitude: Number,
    longitude: Number,
    price: Number,
    hour: String,
    day: Number,
    status: Number,
});


export default model('Spot', spotSchema);