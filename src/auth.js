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
                const newToken = await auth.checkToken(token);
                req.user = newToken.user;
                
                if (newToken.token) {
                    res.set("Access-Control-Expose-Headers", "x-token");
                    res.set("x-token", newToken.token);
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
            return { user: '' };
        }

        const user = await Student.findOne({ _id: idUser });

        let isDriver = false;

        if (user.car) {
            isDriver = true;
        }

        const newToken = auth.getToken(user, isDriver);

        return {
            user: user._id,
            token: newToken
        }

    },
    getToken: ({_id}, isDriver) => {
        const token = jwt.sign({userId: _id, isDriver: isDriver}, process.env.SECRET, { expiresIn: '1h'});

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

        let isDriver = false;
        
        if (student.car) {
            isDriver = true;
        }

        const token = auth.getToken(student, isDriver);

        return {
            success: true,
            token: token,
            isDriver,
            user: student,
            errors: []
        }
    }
}

export default auth;