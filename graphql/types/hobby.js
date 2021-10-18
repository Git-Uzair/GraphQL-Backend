const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList } = require('graphql')
const { db } = require('../../models')

const hobbyType = new GraphQLObjectType({
    name: 'hobby',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt), resolve: (hobby) => hobby.id },
        name: { type: GraphQLNonNull(GraphQLString), resolve: (hobby) => hobby.name },
        users: {
            type: GraphQLList(require('./user')), resolve: async (hobby) => {
                try {
                    return await db('hobbies').join('userHobbies', { 'hobbies.id': 'userHobbies.hobbyId' }).join('users', { 'userHobbies.userId': 'users.id' }).select('users.id', 'users.firstName', 'users.lastName', 'users.email', 'users.userSub', 'users.age').where('userHobbies.hobbyId', hobby.id)
                } catch (error) {
                    console.log(error)
                    throw new Error(error);
                }
            }
        }
    })
})

module.exports = hobbyType