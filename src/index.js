const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
import LibTodos from '../lib/LibTodos'

const typeDefs = gql`
  type Todo {
    id: Int!
    title: String
  }
  type Query {
    hello: String
    todo(id: Int): Todo
    todos: [Todo]    
  }
`;
// Provide resolver functions for your schema fields

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    async todo(parent, args, context, info){
//      return todos.find(todo => todo.id === args.id);
      return await LibTodos.get_todo(args.id);
    },
    todos:async () => {
      //return todos
      return await LibTodos.get_items()
    },    
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
//await server.start();
const app = express();
server.applyMiddleware({ app });
// ENV
console.log(app.get('env'));
var config = require('../config.json')[app.get('env')];
// console.log(config.MYSQL_DBNAME);

app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
