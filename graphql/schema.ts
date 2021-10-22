// graphql/schema.ts
/**
 * First aproach defining schemas manually
 * import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Link {
    id: String
    title: String
    description: String
    url: String
    category: String
    imageUrl: String
    users: [String]
  }

  type Query {
    links: [Link]!
  }
`;
 */

// /graphql/schema.ts
import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './types';

// -- schema will be generated in the folder graphql with name schema.graphql
// -- will use the context the we already created in folder graphql
// -- Make sure the server is running and navigate to http://localhost:3000/api/graphql
// -- to generate the schema and everytime you need to regenerate it
export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(
      process.cwd(),
      'node_modules',
      '@types',
      'nexus-typegen',
      'index.d.ts'
    ),
    schema: join(process.cwd(), 'graphql', 'schema.graphql')
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts')
  }
});
