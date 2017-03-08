var express = require('express');
var path = require('path');
var multer  = require('multer');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var mkdirp = require('mkdirp');

var firebaseAdmin = require("firebase-admin");

var index = require('./routes/index');
var users = require('./routes/users');

var cors = require('cors');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var whitelist = [
  'http://localhost:5555'
];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};

app.use(cors(corsOptions));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// ===== FIREBASE INITIALISATION PART ====

var serviceAccount = require("./serviceAccountCredentials.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://oneforcode.firebaseio.com"
});

db = firebaseAdmin.database();

// ===== GLOBAL VARIABLES =====
paymentsList = [];

// ===== API PART =====
CLIENT_ID = "d2911925423f70c339c5";
CLIENT_SECRET = "28d5b2b4135993ab67045843e17188f28a8e0b29";

app.use('/api/repos', [function(req, res, next) {
    if (req.method != 'OPTIONS') {

        var options = {
            url: 'https://api.github.com/users/'+ req.query.username + '/repos?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
            headers: {
                'User-Agent': 'request'
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);

                parseRepos(info);
                res.status(200).send(parseRepos(info));
            } else {
                res.status(200).send("Error retreiving the response: ");
            }
        }

        request(options, callback);

    } else
        res.status(200).send('OPTIONS Request SUCCESS');

}]);


function getPayments() {
  //Get the payments from FirebaseDb and set it to the global vriable paymentsList
  var refPayments = db.ref("/").child("payments").on("value", function(snapshot) {
    this.paymentsList = snapshot.val();
    console.log(JSON.stringify(this.paymentsList));
  });
}


getPayments();


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
