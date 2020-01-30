import University from './../models/University';
import Student from './../models/Student';
import Car from '../models/Car';

export const type = {
    Student: {
        university: async({ university }) => {
            return (await University.findOne({ acronym: university }));
        },
        car: async({ car }) => {
            console.log(car);
            return (await Car.findById(car));
        }
    },
}