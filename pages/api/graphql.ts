import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';
import Cors from 'micro-cors';
import { createContext } from '../../graphql/context';

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  // -- for Apollo studio to work
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
});

// -- https://nextjs.org/docs/api-routes/api-middlewares
// -- bodyParser Enables body parsing,
// -- the default config on Next it's json
// -- to use GraphQL playground
export const config = {
  api: {
    bodyParser: false
  }
};
