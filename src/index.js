// require('dotenv').config()

// const express = require("express");
// const cors = require('cors');
// const router = require('./routes/api/v1/index');
// const connectDB = require('./db/mongoDB');
// const connectMySQLDB = require('./db/mysqlDB');
// const cookieParser = require('cookie-parser');
// const passport = require('passport');
// const googleLogin = require('./utils/Provider');
// const connectChat = require('./utils/socketIO');

// const app = express();

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200,
//     credentials: true
// }

// app.use(cors(corsOptions));
// app.use(cookieParser())

// app.use('/public', express.static('public'))

// connectDB();
// connectChat();


// app.use(express.json());
// app.use(require('express-session')({ secret: process.env.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true }));

// app.use(passport.initialize());
// app.use(passport.session());

// googleLogin();

// app.get("/", (req, res) => {
//     console.log("Welcome to Fruitables Backend");
//     res.status(200).json({message: "Welcome to Fruitables Backend"})
// })

// // http://localhost:8000/api/v1
// app.use("/api/v1", router);

// // http://localhost:8000
// app.listen(process.env.PORT, () => {
//     console.log("Server started at port 8000.");
// })

// // module.exports = app;

require('dotenv').config()

const express = require("express");
const cors = require('cors');
const router = require('./routes/api/v1/index');
const connectDB = require('./db/mongoDB');
const connectMySQLDB = require('./db/mysqlDB');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const googleLogin = require('./utils/Provider');
const connectChat = require('./utils/socketIO');

const app = express();

const corsOptions = {
    origin: 'https://7pm-frontend-lxoq.vercel.app',
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser())

app.use('/public', express.static('public'))

connectDB();
connectChat();


app.use(express.json());
app.use(require('express-session')({ secret: process.env.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

googleLogin();

app.get("/", (req, res) => {
    console.log("Welcome to Fruitables Backend");
    res.status(200).json({message: "Welcome to Fruitables Backend"})
})

// http://localhost:8000/api/v1
app.use("/api/v1", router);

// http://localhost:8000
// app.listen(process.env.PORT, () => {
//     console.log("Server started at port 8000.");
// })

module.exports = app;

