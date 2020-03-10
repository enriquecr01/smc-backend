import express from "express";
import graphqlHTTP from "express-graphql";
import schema from './schema/schema';

import auth from './auth';

import { connect } from './database/database';

import "dotenv/config";

const app = express();
const SECRET = "SMC";
connect();

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
});

app.use(auth.checkHeaders);

app.use('/graphql', graphqlHTTP((req) => {
    return {
        graphiql: true,
        schema: schema,
        context: {
            SECRET: process.env.SECRET,
            user: req.user
        }
    }
}))

app.listen(process.env.PORT, () => console.log("Example"));