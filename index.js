const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema")
const { Query } = require("./resolvers/Query")
const { Product } = require("./resolvers/Product")
const { Category } = require("./resolvers/Category")
const { db } = require("./db")
const { Mutation } = require("./resolvers/Mutation")

const server = new ApolloServer({
  typeDefs,
  resolvers: {
      Query,
      Mutation,
      Product,
      Category
  },
  context: {
    db
  }
});

server.listen().then(({ url }) => console.log(`Server is ready on: ${url}`))