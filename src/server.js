const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('./passport/setup');
const auth = require('./api/auth');
const users = require('./api/users');
const dashboard = require('./api/dashboard');

const MONGO_PWD = process.env.MONGODB_PWD;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;

//Set up default mongoose connection
const MONGODB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGO_PWD}@cluster0.7nfn2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const app = express();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());



app.use(session({
    secret: "jqksngmpjkqengpmjneqpvgo slkdvnpoq sevui, sqdfpig,oqvrepoivnù,qsoir^nv lwoîs vi^wod,vowsdrvfgoi,sùoqrivôwsdinvôwienrgvùwopinfdùvpwosdf",
    resave: false,
    saveUninitialized: true,
    store: new MongoDBStore({
        uri: MONGODB_URL,
        collection: 'mySessions'
    })
}));

app.use("/", dashboard);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(passport.initialize());
app.use(passport.session());

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});