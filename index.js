const { ApolloServer, gql } = require('apollo-server');
const dataService = require('./server/dataService');

const typeDefs = gql`
  type Todo {
    id: Int
    title: String
    completed: Boolean
    userId: Int
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
    # get all todos
    todos: [Todo]
    # get single todo
    todo(id: Int!): Todo
    # get all users
    users: [User]
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
    id: Int!
  }

  input TodoInput {
    title: String!
    completed: Boolean!
  }

  type Mutation {
    # add single todo
    addTodo(todo: TodoInput!): Todo
    # update single todo
    updateTodo(id: Int!, todo: TodoInput!): Todo
    # delete single todo
    deleteTodo(id: Int!): DeleteResponse
    # mark a todo  as completed
    markAsCompleted(id: Int!): Todo
  }
`;

const resolvers = {
  Query: {
    todos: async () => await dataService.getTodos(),
    todo: async (obj, { id }) => await dataService.getTodo(id),
    users: async () => await dataService.getUsers(),
  },
  Mutation: {
    addTodo: async (obj, { todo }) => await dataService.addTodo(todo),
    updateTodo: async (obj, { id, todo }) =>
      await dataService.updateTodo(id, todo),
    deleteTodo: async (obj, { id }) => await dataService.deleteTodo(id),
    markAsCompleted: async (obj, { id }) =>
      await dataService.markAsCompleted(id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

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

/** Sample Mutation for playground
  
mutation {
  markAsCompleted(id: 5) {id, title, completed}
}

*/

/** Sample Mutation for playground

mutation {
  addTodo(todo: { title: "new todo", completed: false }) {
    id
    title
    completed
  }
}

*/

/** Mutation and Query Examples for Playground
 
mutation addTodo {
  addTodo(todo: { title: "new todo", completed: false }) {
    id
    title
    completed
  }
}

query getTodos {
  todos {
    id
    title
    completed
  }
}

query getUsers {
  users {
    id
    name
    username
    email
    address {
      street
      zipcode
      geo {
        lat
        lng
      }
    }
  }
}

*/
