const createApolloApp = require('./app');

const PORT = process.env.GRAPHQL_PORT || 4000;

async function startServer() {
  try {
    const { app, server } = await createApolloApp();

    app.listen(PORT, () => {
      console.log(`🚀 Pokemon Teams GraphQL API running at http://localhost:${PORT}${server.graphqlPath}`);
      console.log(`📊 GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
      console.log(`💗 Health check available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Error starting GraphQL server:', error);
    process.exit(1);
  }
}

startServer();
