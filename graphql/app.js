const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// GraphQL Schema and Resolvers
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');

// Services
const trainerService = require('../service/trainerService');

async function createApolloApp() {
  const app = express();

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Get token from headers
      const token = req.headers.authorization;

      // Add the user to the context if token exists
      let user = null;
      if (token) {
        try {
          // Remove 'Bearer ' prefix if present
          const cleanToken = token.replace('Bearer ', '');

          const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET || 'pokemon_secret_key_2024');

          // Get full user data
          user = trainerService.getTrainerByUsername(decoded.username);
        } catch (error) {
          // Invalid token - user remains null
          console.log('Invalid token:', error.message);
        }
      }

      return { user };
    },
    // Enable GraphQL Playground in development
    introspection: true,
    playground: true,
  });

  // Apply Apollo GraphQL middleware
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Pokemon Teams GraphQL API',
      graphql: server.graphqlPath,
    });
  });

  return { app, server };
}

module.exports = createApolloApp;
