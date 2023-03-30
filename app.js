var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ee = require('@google/earthengine');
var engines = require('consolidate');



var indexRouter = require('./routes/index');

var app = express();
app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);


// Private key, in `.json` format, for an Earth Engine service account.
const PRIVATE_KEY = require('./private-key.json');
const PORT = process.env.PORT || 3000;

ee.data.authenticateViaPrivateKey(PRIVATE_KEY, () => {
  ee.initialize(null, null, () => {
    app.listen(PORT);
    console.log(`Listening on port ${PORT}`);
  });
}, (e) => {
    console.error('Authentication error: ' + e);
});


module.exports = app;
