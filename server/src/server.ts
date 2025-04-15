import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';  // ES Module Import
import { authenticationToken } from './services/auth.js';  // ES Module Import
import db from './config/connection.js';  // Import the database connection
import { fileURLToPath } from 'url';
import {dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  try {
    await db();  // Connect to MongoDB
    console.log("Connected to the database.");

    await server.start();  // Start Apollo Server

    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server as any, {
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
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);  // Exit if there's an error
  }
};

startApolloServer();

