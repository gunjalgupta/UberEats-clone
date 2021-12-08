const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const expressGraphQL = require('express-graphql').graphqlHTTP

const app = express();
const mongoose = require('mongoose')

//const session = require("express-session");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");

var schema = require('./schema/schema');
mongoose.connect("mongodb+srv://cluster0_Gunjal:databse@cluster0.1n5rc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

// const Schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'Helloworld',
//         fields : () => ({
//             message : {type : GraphQLString,
//             resolve: () => 'Heloworlddd'
//             }
//         })
//     })
// })
app.use('/graphql', expressGraphQL({
    schema,
    graphiql : true
}))

app.listen(5000, ()=> { console.log( " listening on 5000")});