const userType = require('../types/user')
const { db } = require('../../models')
const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


const createUser = {
    type: userType,
    description: 'This mutation allows you to create a new user',
    args: {
        firstName: {
            type: GraphQLNonNull(GraphQLString)
        },
        lastName: {
            type: GraphQLNonNull(GraphQLString)
        },
        email: {
            type: GraphQLNonNull(GraphQLString)
        },
        userSub: {
            type: GraphQLNonNull(GraphQLString)
        },
        age: {
            type: GraphQLInt
        }
    },
    resolve: async (_, args) => {
        try {
            user = await db('users').insert(args, '*')
            return user[0]
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }

    }

}

const updateUser = {
    type: userType,
    description: 'This mutation allows you to update an existing user',
    args: {
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        userSub: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        hobbies: {
            type: GraphQLList(GraphQLInt)
        }
    },
    resolve: async (_, args) => {

        try {
            user = await db('users').select('*').where('id', args.id).first()

            if (user) {
                console.log("***********")
                if (args.hobbies) {
                    await db('userHobbies').where('userId', args.id).del()
                    args.hobbies.map(async (hobbyId) => {
                        try {
                            await db('userHobbies').insert({ userId: args.id, hobbyId: hobbyId })
                        } catch (error) {
                            console.log(error)
                            throw new Error(error)
                        }

                    })
                    delete args.hobbies
                }
                user = await db('users').where('id', args.id).update(args, '*')
                return user[0]
            }
            else {
                throw new Error("No user exists with the provided id")
            }

        } catch (error) {
            console.log(error)
            throw new Error(error);
        }

    }

}

module.exports = { createUser, updateUser }