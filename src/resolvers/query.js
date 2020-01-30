import User from './../models/User';
import University from './../models/University';
import Student from './../models/Student';

export const query = {
    Query: {
        async Universities() {
            return await University.find();
        },
        async Students() {
            return await Student.find();
        }
    }
}