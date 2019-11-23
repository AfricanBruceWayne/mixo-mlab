const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const chalk = require('chalk');
const logger = require('morgan');
const mongoose = require('mongoose');

/*
*   Load environment variables
*/

dotenv.config({ path: '.env' });

/*
* Connect to Mongo
*/

//Set up default mongoose connection
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

// Create Express server
const app = express();

// Body parser middleware
app.use(express.json());

// Serve static assets if in production
if (process.env.NODE_ENV === 'production')
{
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorHandler());
  } else {
    app.use((err, req, res, next) => {
      console.error('%s ' + err, chalk.red('✗'));
      res.status(500).send('Server Error');
    });
  }

/*
*   Start Express server
*/
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log('%s App is succesfully running', chalk.green('✓'));
});

