import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";

import Student from './models/Student';

const auth = {
    checkHeaders: async(req, res, next) => {
        const token = req.headers["x-token"];

        if(token) {
            try {
                const { userId } = jwt.verify(token, process.env.SECRET);
                req.user = userId;
            } catch(e) {
                // Invalid Token
                const newToken = await auth.checkToken(token, process.env.SECRET);
                req.user = newToken;

                if (newToken.token) {
                    res.set("Access-Control-Expose-Headers", "x-token");
                    res.set("x-token", newToken.token)
                }
            }
        }

        next();
    },
    checkToken: async (token) => {
        let idUser = null;
        try {
            const { userId } = await jwt.decode(token);
            idUser = userId;
        } catch (e) {
            return {};
        }

        const user = await Student.findOne({ _id: idUser });
        const newToken = auth.getToken(user);

        return {
            user: user._id,
            token: newToken
        }

    },
    getToken: ({_id}) => {
        const token = jwt.sign({userId: _id}, process.env.SECRET, { expiresIn: '1h'});

        return token;
    },
    login: async(enrollNumber, password) => {
        const student = await Student.findOne({ enrollNumber: enrollNumber });
        
        if (!student) {
            return {
                success: false,
                errors: ["Enroll number doesn't not exists"]
            }
        }

        const validPassword = await bcrypt.compare(password, student.password);

        if (!validPassword) {
            return {
                success: false,
                errors: ["The password is invalid"]
            }
        }

        const token = auth.getToken(student);

        return {
            success: true,
            token: token,
            errors: []
        }
    }
}

export default auth;