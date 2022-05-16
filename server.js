require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(
    bodyparser.json( { limit: "30mb", extended: true }),
    bodyparser.urlencoded( { limit: "30mb", extended: true }),
    cors()
)

app.listen(process.env.PORT)

// mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then( () => app.listen(process.env.PORT, () => console.log(`Database Connected : Server running`)) )
//     .catch( (err) => console.log(err.message) )