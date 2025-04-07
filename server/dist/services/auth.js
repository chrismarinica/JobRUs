import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();
export const authenticationToken = ({ req }) => {
    const authHeader = req.headers.authorization;
    const bodyToken = req.body.token;
    const queryToken = req.query.token;
    let token = bodyToken || queryToken || authHeader;
    if (authHeader) {
        token = token.split(' ').pop().trim();
    }
    if (!token) {
        return req;
    }
    try {
        const secretKey = process.env.JWT_SECRET_KEY || '';
        const { data } = jwt.verify(token, secretKey, { maxAge: '2hr' });
        req.user = data;
    }
    catch (err) {
        console.log("Invalid token");
    }
    return req;
};
export const siginToken = (username, email, _id) => {
    const payload = { username, email, _id };
    const secretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ data: payload }, secretKey, { expiresIn: '2hr' });
};
export class AuthenticationError extends GraphQLError {
    constructor(message) {
        super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
        Object.defineProperty(this, 'name', { value: 'AuthenicatationError' });
    }
}
;
