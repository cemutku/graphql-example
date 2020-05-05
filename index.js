const { ApolloServer, gql } = require('apollo-server');
const dataService = require('./server/dataService');

const typeDefs = gql`
  type Todo {
    id: Int
    title: String
    completed: Boolean
  }

  type User {
    id: Int
    name: String
    username: String
    email: String
    address: Address
    website: String
    company: Company
    todos: [Todo]
  }

  type Address {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: Geolocation
  }

  type Geolocation {
    lat: String
    lng: String
  }

  type Company {
    name: String
    catchPhrase: String
    bs: String
  }

  type Query {
    todos: [Todo]
    todo(id: Int!): Todo
    users: [User]
  }
`;

const resolvers = {
  Query: {
    todos: async () => await dataService.getTodos(),
    todo: async (obj, { id }) => await dataService.getTodo(id),
    users: async () => await dataService.getUsers(),
  },
};

/** Sample Query for playground
{
  users {
    name
    username
    todos {
      id
      title
      completed
    }
  }
}
 */

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
