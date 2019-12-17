const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const session = require('express-session');
const logger = require('morgan');
const cors  =   require('cors');
const mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV === 'production';

/*
*  Load environment variables
*/

dotenv.config({ path: '.env' });

/*
*   Require routes
*/
var authRoutes = require('./routes/api/auth'),
    userRoutes = require('./routes/api/users'),
    cocktailRoutes = require('./routes/api/cocktails'),
    commentRoutes = require('./routes/api/comments'),
    profileRoutes = require('./routes/api/profiles'),
    indexRoutes = require('./routes/api/index'),
    favouriteRoutes = require('./routes/api/favourites');

/*
* Connect to Mongo
*/

// Set up default mongoose connection
const uri = process.env.MLAB_URI;
mongoose.connect(uri, { 
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log('%s Connected to MLab', chalk.green('✓'));
})
.catch((err) => {
    console.log('%s MongoDB connection error: ' + err, chalk.red('✗'));
    process.exit();
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, '%s MongoDB connection error: ', chalk.red('✗')));

// Create global app object
const app = express();

// Normal express config defaults
app.use(cors());
app.use(logger('dev'));
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }
}));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/:id/followers', profileRoutes);
app.use('/api/cocktails', cocktailRoutes);
app.use('/api/cocktails/:id/comments', commentRoutes);
app.use('/api/cocktails/:id/favourites', favouriteRoutes);
app.use('/api/home', indexRoutes);



// Serve static assets if in production
if (isProduction)
{
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

/*
 * Error Handler.
*/

if (!isProduction) 
{
    // only use in development
    app.use(errorHandler());
} else 
{
    app.use((err, req, res, next) => {
        // catch 404 and forward to error handler
        if (res.status(404)) { 
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
        if (res.status(500)) {
            console.error('%s ' + err, chalk.red('✗'));
            res.status(500).send('Server Error');
            res.json({'errors': {
                message: err.message,
                error: {}
            }});
        }
    });
}

/*
*   Start Express server
*/

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log('%s App is succesfully running', chalk.green('✓'));
});

