import University from './../models/University';
import Student from './../models/Student';
import Car from './../models/Car';
import Spot from './../models/Spot';
import Ride from './../models/Ride';

export const query = {
    Query: {
        async Universities() {
            return await University.find();
        },
        async Student(__, { idStudent }, { user }) {
            if (user.length === 0) { throw new Error("No autenticado"); }
            else { return await Student.findById(idStudent); }
        },
        async Students(__, args, { user }) {
            if (user.length === 0) { throw new Error("No autenticado"); }
            else { return await Student.find(); }
        },
        async Cars() {
            return await Car.find();
        },
        async Spots() {
            return await Spot.find();
        },
        async Rides() {
            return await Ride.find();
        },
        async SpotsByCityUniversityAndDay(__, { city, university, day }) {
            const spots = [];
            const students = await Student.find({ city: city, university: university });
            for (const student of students) {
                const spotsStudent = await Spot.find({ driver: student._id, day: day });
                for (const spot of spotsStudent) { spots.push(spot); }
            }
            return spots;
        },
        async SpotsByDriverAndDay(__, { driver, day }) {
            return await Spot.find({ driver: driver, day: day });
        }
    }
}