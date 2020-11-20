import { gql, ApolloServer, makeExecutableSchema } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { instrospectionQueryString } from '../../introspection_query';

const typeDefs = gql`
type Query {
  rootQuery1(var1: String!): QueryResponse!
  rootQuery2: QueryResponse!
}

type Mutation {
  rootMutation1(var2: Int!, var3: [String!]! = "Default String"): MutationResponse!
}

type QueryResponse {
  id: ID!
  array: [String!]!
  relation: Object1
}

type MutationResponse {
  success: Boolean!
  code: Int!
  errors: [String]!
}

type Object1 {
  id: ID!
  object2: Object2
}

type Object2 {
  id: ID!
  object1: Object1!
}
`;

const schema = makeExecutableSchema({ typeDefs });

const mocks = {
  ID: () => 'b1077c17-b48e-4a8d-8b0e-9a09e6352341',
};

const constructTestServer = () => new ApolloServer({ schema, mocks })


// Run this function everytime a change is made to the typeDefs
export async function generateFakeSchemaAndIntrospectionResult() {
  const fs = require('fs');
  const path = require("path");
  const server = constructTestServer()
  const { query } = createTestClient(server);
  const instrospectionQuery = gql`${instrospectionQueryString}`
  const params = { query: instrospectionQuery };

  const { data } = await query(params);

  fs.writeFileSync(
    path.resolve(__dirname, "./test_introspection_result.json"),
    JSON.stringify({ data })
  );
}
