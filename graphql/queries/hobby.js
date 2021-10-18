const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} = require('graphql');
const hobbyType = require('../types/hobby')
const { db } = require('../../models')

const hobbiesQuery = {
    type: GraphQLList(hobbyType),
    resolve: async () => {
        try {
            return await db('hobbies').select('*')
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }

    }
}

const hobbyQuery = {
    type: hobbyType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: async (root, args) => {
        try {
            hobby = await db('hobbies').select('*').where('id', args.id).first()
            if(hobby)
            {
                return hobby
            }
            else
            {
                throw new Error("No hobby exists with the provided id")
            }
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }

    }

}

module.exports = { hobbyQuery, hobbiesQuery }