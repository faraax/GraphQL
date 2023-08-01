import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'
import db from './_db.js'
import 'dotenv/config'

// const app = express();

// app.use(cors())

// app.get('/', async (req, res) => {
//     const data = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json()
//     res.send(data)
// })

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// })

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, agrs) {
            return db.games.find(game => game.id === agrs.id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find(author => author.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find(review => review.id === args.id)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT }
})

console.log(`Server is ready on port ${url}`);