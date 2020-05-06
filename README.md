# GraphQL Apollo Server Example

This project contains basic GraphQL query and mutation examples. It has three query types and four mutation types. The index.js file has some example queries.

Query

- todos
- todo
- users

Mutation

- addTodo
- updateTodo
- deleteTodo
- markAsCompleted

## Development

Run `npm install` to get node_modules and run `npm start` for a dev server. Navigate to `http://localhost:4000/` for GraphQL Playground and execute your GraphQL queries.

There is a fake API created with `json-server` under `http://localhost:3000/` check `/todos` and `/users` for json data (db.json). It will be started with the Apollo Server via `npm start` command.
