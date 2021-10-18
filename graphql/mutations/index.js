const {  GraphQLObjectType } = require('graphql')
const {createUser, updateUser} = require('./user')
const {createHobby, selectHobby} = require('./hobby')


const rootMutation = new GraphQLObjectType({
    name: "rootMutation",
    description: 'This is the root mutation which holds all WRITE operations',
    fields: () => ({
        createUser:  createUser,
        createHobby: createHobby,
        selectHobby: selectHobby,
        updateUser: updateUser
        //add more mutations(WRITE RELATED QUERIES) here
    })
})

module.exports = rootMutation