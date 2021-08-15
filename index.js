const GraphQLServer = require('manablox-graphqlserver')

const serverConfig = require('./config/server')
const graphqlConfig = require('./config/graphql')

const server = new GraphQLServer()
server.Initialize(serverConfig, graphqlConfig)
server.Start()