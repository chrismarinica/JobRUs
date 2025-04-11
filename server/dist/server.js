var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js'; // ES Module Import
import { authenticationToken } from './services/auth.js'; // ES Module Import
import db from './config/connection.js'; // Import the database connection
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db(); // Connect to MongoDB
        console.log("Connected to the database.");
        yield server.start(); // Start Apollo Server
        const app = express();
        const PORT = process.env.PORT || 3001;
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        app.use('/graphql', expressMiddleware(server, {
            context: authenticationToken,
        }));
        // Serve the client build if in production
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, '../../client/build')));
            app.get('*', (_req, res) => {
                res.sendFile(path.join(__dirname, '../../client/build/index.html'));
            });
        }
        app.listen(PORT, () => {
            console.log(`🌍 Now listening on localhost:${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    }
    catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit if there's an error
    }
});
startApolloServer();
