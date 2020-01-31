import University from './../models/University';
import Student from './../models/Student';
import Car from './../models/Car';

export const mutation = {
    Mutation: {
        async createUniversity(__, { input }) {
            const newUniversity = new University(input);
            await newUniversity.save();
            return newUniversity;
        },
        async createStudent(__, { input }) {
            const defaultValues = { raiting: 5, photo: 'default.png' };
            input = {
                ...input,
                ...defaultValues
            };
            const newStudent = new Student(input);
            await newStudent.save();
            return newStudent;
        },
        async createCar(__, { input }) {
            const newCar = new Car(input);
            await newCar.save();
            return newCar;
        }
        // async deleteUser(__, { _id }) {
        //     return await User.findByIdAndDelete(_id);
        // },
        // async updateUser(__, { _id, input }) {
        //     return await User.findByIdAndUpdate(_id, input, { new: true });
        // }
    }
}