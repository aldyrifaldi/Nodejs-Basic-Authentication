const express = require('express'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv')

dotenv.config()
// server port
const port = process.env.SERVER_PORT || 4500

// call routes from auth
const authRoutes = require('./routes/auth')

// use body parser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Error handling
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });


// use prefix /api/auth/
app.use('/api/auth',authRoutes)



// database connection configuration
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