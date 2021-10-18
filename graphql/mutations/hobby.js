const hobbyType = require('../types/hobby')
const { db } = require('../../models')
const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const createHobby = {
    type: hobbyType,
    description: 'This mutation allows you to create a new hobby',
    args: {
        name: {
            type: GraphQLNonNull(GraphQLString)
        }
    },
    resolve: async (_, args) => {
        try {
            hobby = await db('hobbies').insert(args, '*')
            return hobby[0]
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }

    }
}



const selectHobby = {
    type: hobbyType,
    description: 'This mutation allows you to assign a hobby to an existing user',
    args: {
        userId: {
            type: GraphQLNonNull(GraphQLInt)
        },
        hobbyId: {
            type: GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: async (_, args) => {
        try {
            user = await db('users').select('*').where('id', args.userId).first()
            hobby = await db('hobbies').select('*').where('id',args.hobbyId).first()
            if(user && hobby)
            {        
                userHobby = await db('userHobbies').insert(args, '*')
                hobby = await db('hobbies').select('*').where('id', userHobby[0].hobbyId).first()
                return hobby
            }
            else
            {
                throw new Error("No row exists with either the hobby id or the user id")
            }
            
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }


    }
}


module.exports = { createHobby, selectHobby }