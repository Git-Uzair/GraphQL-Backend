const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList } = require('graphql')
const hobbyType = require('./hobby')
const { db } = require('../../models')


const userType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt), resolve: (user) => user.id },
        firstName: { type: GraphQLNonNull(GraphQLString), resolve: (user) => user.firstName },
        lastName: { type: GraphQLNonNull(GraphQLString), resolve: (user) => user.lastName },
        email: { type: GraphQLNonNull(GraphQLString), resolve: (user) => user.email },
        userSub: { type: GraphQLNonNull(GraphQLString), resolve: (user) => user.userSub },
        age: { type: GraphQLInt, resolve: (user) => user.age },
        hobbies: {
            type: GraphQLList(hobbyType), resolve: async (user) => {
                try {
                    return await db('users').join('userHobbies', { 'users.id': 'userHobbies.userId' }).join('hobbies', { 'userHobbies.hobbyId': 'hobbies.id' }).select('hobbies.id', 'hobbies.name').where('userHobbies.userId', user.id)
                } catch (error) {
                    console.log(error)
                    throw new Error(error);
                }
            }
        }
    })
})

module.exports = userType