const typeDefs = require('./graphql/types')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema, GraphQLObjectType } = require('graphql')
const rootQuery = require('./graphql/queries')
const rootMutation = require('./graphql/mutations')
const {db} = require('./models')
const config = require('./config')
const api = require('./routes/api')

const app = express();



const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})

// Expand data transfer size limit, to cater files in the future
app.use(bodyParser.json({ limit: '150mb' }))
app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true,
    parameterLimit: 50000
}))

// Whitelist connection for CORS check. Whitelist array is in the config file.
var corsOptionsDelegate = function (req, callback) {
    var corsOptions
    if (config.WHITELIST.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true, credentials: true }
    } else {
        corsOptions = { origin: false, credentials: true }
    }
    callback(null, corsOptions)
}


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))
app.use(cors(corsOptionsDelegate))

app.use('/api', api)
app.listen(config.PORT, async () => {
    //db.connect();
    console.log(`Server ready at http://localhost:4000`)
    console.log(`GraphQl CLI running at http://localhost:4000/graphql`)
});

