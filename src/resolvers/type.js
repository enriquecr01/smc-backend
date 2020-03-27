import University from './../models/University';
import Student from './../models/Student';
import Car from '../models/Car';
import Spot from '../models/Spot';

export const type = {
    Student: {
        university: async({ university }) => {
            return (await University.findById(university));
        },
        car: async({ car }) => {
            return (await Car.findById(car));
        },
        spots: async({ spots }) => {
            const arrSpots = [];
            for (const spotId of spots) {
                const spot = await Spot.findById(spotId);
                arrSpots.push(spot);
            }
            return arrSpots;
        }
    },
    Spot: {
        driver: async({ driver }) => {
            return (await Student.findById(driver));
        },
        passengers: async({ passengers }) => {
            const arrPassengers = [];
            for (const passengerId of passengers) {
                const passenger = await Student.findById(passengerId);
                arrPassengers.push(passenger);
            }
            return arrPassengers;
        }
    },
    Ride: {
        spot: async({ spot }) => {
            return (await Spot.findById(spot));
        },
        passenger: async({ passenger }) => {
            return (await Student.findById(passenger));
        }
    }
}