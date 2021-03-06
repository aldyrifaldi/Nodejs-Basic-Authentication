const express = require('express'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv'),
    cors = require('./config/cors'),
    routeError = require('./routes/errors/internal-error')

dotenv.config()
// server port
const port = process.env.SERVER_PORT || 4500

// call routes from auth
const routes = require('./routes')

// use body parser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors)

app.use(routes)

// dsatabase connection configuration
const mc = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

// connect to database
mc.connect()

app.listen(port,() => {
    console.log(`Running server at http://localhost:${port}`);
})