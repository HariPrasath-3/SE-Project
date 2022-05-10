const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('./assets/'));

// app.use(expressLayouts);
// //extracts styles and scripts from subpage into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);



//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

var store = new MongoStore({
    uri: 'mongodb://localhost:27017/Project_Management',
    databaseName: 'Project_Management',
    collection: 'sessions'
},function(err){
    if(err){
        console.log("Error ",err);
    }
});
  
// Catch errors
store.on('error', function(error) {
    console.log("error in storing",err);
});

app.use(require('express-session')({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24  // 1 day
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);


app.use('/', require('./routes/home')); 

app.listen(port, (err) => {
    if(err)
        console.log(`Error in running: ${err}`);
    console.log(`server is running on port: ${port}`);
});