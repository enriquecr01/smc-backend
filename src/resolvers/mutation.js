import bcrypt from 'bcrypt';

import University from './../models/University';
import Student from './../models/Student';
import Car from './../models/Car';
import Spot from './../models/Spot';
import Ride from './../models/Ride';

import auth from './../auth';

export const mutation = {
    Mutation: {
        async login(__, {enrollNumber, password}, {SECRET}) {
            return auth.login(enrollNumber, password, SECRET);
        },
        async createUniversity(__, { input }) {
            const newUniversity = new University(input);
            await newUniversity.save();
            return newUniversity;
        },
        async createStudent(__, { input }) {
            const defaultValues = { raiting: 5, photo: 'default.png', status: 1 };
            input.password = bcrypt.hashSync(input.password, 10);
            input = {
                ...input,
                ...defaultValues
            };
            const emptyStudent = {
                enrollNumber: '',
                lastnames: '',
                university: null,
                car: null,
                city: '',
                password: '',
                phone: '',
                latitude: 0.0,
                longitude: 0.0,
                ...defaultValues
            };
            const university = (await University.findById(input.university));

            if (university === null) {
                return {...emptyStudent, name: "The university doesn't exists" }
            }

            if (input.car) {
                const car = (await Car.findById(input.car));
                if (car === null) {
                    return {...emptyStudent, name: "The Car doesn't exists" }
                } else {
                    const newStudent = new Student(input);
                    await newStudent.save();
                    return newStudent;
                }
            } else {
                input = { ...input, spots: [] };
                const newStudent = new Student(input);
                await newStudent.save();
                return newStudent;
            }

        },
        async createCar(__, { input }) {
            const newCar = new Car(input);
            await newCar.save();
            return newCar;
        },
        async createSpot(__, { input }) {
            const driver = (await Student.findById(input.driver));
            const car = await Car.findById(driver.car);
            const defaultValues = { status: 0, availableSpace: car.spaceInCar };
            const emptySpot = {
                driver: "The driver doesn't not exists",
                latitude: 32.529821,
                longitude: -117.023595,
                price: 0,
                hour: "00:00",
                day: 0,
                availableSpace: 0
            };
            if (driver === null) {
                return {...emptySpot, ...defaultValues };
            } else {
                input = {...input, ...defaultValues };
                const newSpot = new Spot(input);
                await newSpot.save();
                return newSpot;
            }
        },
        async createRide(__, { input }) {
            const defaultValues = { status: 3 };
            const emptyRide = {
                spot: null,
                passenger: null,
                status: 4
            };
            const passenger = (await Student.findById(input.passenger));
            const spot = (await Spot.findById(input.spot));
            if (passenger === null || spot === null) {
                return {...emptyRide, ...defaultValues };
            } else {
                input = {...input, ...defaultValues };
                const newRide = new Ride(input);
                await newRide.save();
                return newRide;
            }
        }
        // async deleteUser(__, { _id }) {
        //     return await User.findByIdAndDelete(_id);
        // },
        // async updateUser(__, { _id, input }) {
        //     return await User.findByIdAndUpdate(_id, input, { new: true });
        // }
    }
}