const { GraphQLObjectType } = require('graphql')
const { userQuery, usersQuery } = require('./user')
const { hobbyQuery, hobbiesQuery } = require('./hobby')

const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    description: "This is the root Query which holds all READ operations",
    fields: () => ({
        getUser: userQuery,
        getUsers: usersQuery,
        getHobby: hobbyQuery,
        getHobbies: hobbiesQuery
        //add more queries(READ RELATED QUERIES here
    })
})

module.exports = rootQuery