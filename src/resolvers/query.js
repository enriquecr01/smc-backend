import University from './../models/University';
import Student from './../models/Student';
import Car from './../models/Car';
import Spot from './../models/Spot';

export const query = {
    Query: {
        async Universities() {
            return await University.find();
        },
        async Students() {
            return await Student.find();
        },
        async Cars() {
            return await Car.find();
        },
        async Spots() {
            return await Spot.find();
        }
    }
}