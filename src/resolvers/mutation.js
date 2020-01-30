import University from './../models/University';

export const mutation = {
    Mutation: {
        async createUniversity(__, { input }) {
            const newUniversity = new University(input);
            await newUniversity.save();
            return newUniversity;
        }
        // async deleteUser(__, { _id }) {
        //     return await User.findByIdAndDelete(_id);
        // },
        // async updateUser(__, { _id, input }) {
        //     return await User.findByIdAndUpdate(_id, input, { new: true });
        // }
    }
}