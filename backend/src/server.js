const envv= require('dotenv').config({ path: '/Users/gunjalgupta/Desktop/UberEats-clone/backend/src/.env' })


const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}.`));



console.log(envv);
