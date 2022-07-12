const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
//1 The typeDefs constant defines your GraphQL schema (more about this in a bit).
// Here, it defines a simple Query type with one field called info. This field has the type String!. 
// The exclamation mark in the type definition means that this field is required and can never be null.
 

//2 The resolvers object is the actual implementation of the GraphQL schema. 
// Notice how its structure is identical to the structure of the type definition inside typeDefs: Query.info.

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
const resolvers = { 
    Query,
    Mutation,
    User,
    Link
}

//3 Finally, the schema and resolvers are bundled and passed to ApolloServer which is imported from apollo-server. 
// This tells the server what API operations are accepted and how they should be resolved.
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');
const prisma = new PrismaClient()
const server = new ApolloServer({ typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'), resolvers, context: ({ req }) => {
    return {
        ...req,
        prisma,
        userId:
            req && req.headers.authorization
                ? getUserId(req)
                : null
    };
}
});

server
    .listen()
    .then(({ url }) => 
        console.log(`🚀 Server is running on ${url}`)
    );



