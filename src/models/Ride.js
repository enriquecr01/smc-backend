import { Schema, model } from 'mongoose';

const rideSchema = new Schema({
    spot: String,
    passenger: String,
    timeArrived: String,
    timeFinish: String,
    calificationPassenger: Number,
    calificationDriver: Number,
    status: Number
});


export default model('ride', rideSchema);