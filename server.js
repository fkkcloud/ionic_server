const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const passport = require('passport');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rateDataBase', {useNewUrlParser: true});

require('./passport/passport-local');
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
    res.header("Access-Control-Allow-Methods", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'thisissecretkey',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// middleware for passport
app.use(passport.initialize());
app.use(passport.session());

const user = require('./routes/userRoute');
const company = require('./routes/companyRoute');

app.use('/api', user); // http://localhost:3000/api/[API CALLS] e.g. ../api/signup/user
app.use('/api', company); //  나중에 /apiV1, /apiV2 이런식으로 api버젼을 나중에 업데이트 다뤄줄수 있음!

app.listen(3000, () => {
    console.log('Server running on port 3000');
});