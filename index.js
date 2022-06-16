import { createServer } from "@graphql-yoga/node";

let clients = [
  {
    name: "John",
    age: 30,
  },
  {
    name: "Jane",
    age: 25,
  },
  {
    name: "Jack",
    age: 20,
  },
];

// Provide your schema
//expect an array of objects
// Mutation are used to add or remove data
const TypeDefs = `
  type Query {
    clients: [Client]
  },
  type Client {
    name: String
    age: Int
  },
  type Mutation {
    addClient(name: String!, age: Int!): Client
  } 
`;
// Provide resolvers that allow the schema to be queried
const resolvers = {
  Query: {
    clients: () => clients,
  },
  Mutation: {
      addClient:(_,{name, age} ) => {
        let newClient = {
          'name': name,
          'age': age,
        };
        clients.push(newClient);
        return newClient;
      },
  },
};

const server = createServer({
  schema: {
    typeDefs: TypeDefs,
    resolvers: resolvers,
  },
});

// Start the server and explore http://localhost:4000/graphql
server.start().catch((err) => console.error(err));
