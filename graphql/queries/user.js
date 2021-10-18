const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} = require('graphql');
const userType = require('../types/user')
const hobbyType = require('../types/hobby')
const { db } = require('../../models')

const usersQuery = {
    type: GraphQLList(userType),
    resolve: async () => {
        try {
            return await db('users').select('*')
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }

    }
}

const userQuery = {
    type: userType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: async (root, args) => {
        try {
            user = await db('users').select('*').where('id', args.id).first()
            if(user)
            {
                return user
            }
            else
            {
                throw new Error("No user exists with the provided id")
            }
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }

    }

}


module.exports = { userQuery, usersQuery }