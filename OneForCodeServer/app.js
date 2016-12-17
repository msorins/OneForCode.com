var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

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

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
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


// ===== API PART =====

function parseRepos(str) {
    res = []
    for(var key in str) {
        crtObj = {}
        crtObj["repo_id"] = str[key].id;
        crtObj["owner_name"] = str[key].owner.name;
        crtObj["name"] = str[key].name;
        crtObj["html_url"] = str[key].html_url;
        crtObj["language"] = str[key].language;

        res.push(crtObj);
    }

    return JSON.stringify(res);
}

CLIENT_ID = "d2911925423f70c339c5"
CLIENT_SECRET = "28d5b2b4135993ab67045843e17188f28a8e0b29"

// ===== API PART =====
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

app.use('/api/projects/new', [function(req, res, next) {
  if (req.method != 'OPTIONS') {
    console.log(req.body);
    response = req.body;
    //TO DO -> put the respone into the mongoDB

    res.status(200).send("OK");

  } else
    res.status(200).send('OPTIONS Request SUCCESS');

}]);

app.use('/api/users/get/gitUID', [function(req, res, next) {
  /*
   @Input: GET parameter 'gitUID' and 'firebaseUID'
   @Returns: JSON with Git user info
   */
  if (req.method != 'OPTIONS') {
    if(req.query.gitUID != null) {

      var options = {
        url: 'https://api.github.com/user/'+req.query.gitUID + '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
        headers: {
          'User-Agent': 'request'
        }
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);

          firebaseUID = req.query.firebaseUID;
          addUserDataToDb(firebaseUID, info);

          res.status(200).send(JSON.stringify(info));
        } else {
          res.status(200).send("Error retriving the response: ");
        }
      }

      request(options, callback);
    } else {
      res.status(200).send("Must provide and 'gitUID' GET parameter ");
    }


  } else
    res.status(200).send('OPTIONS Request SUCCESS');

}]);

app.use('/api/users/get/gitToken', [function(req, res, next) {
  /*
  @Input: GET parameter 'gitToken' and 'firebaseUID'
  @Returns: JSON with Git user info
   */
  if (req.method != 'OPTIONS') {
    if(req.query.gitToken != null) {

      var options = {
        url: 'https://api.github.com/user?access_token='+req.query.gitToken,
        headers: {
          'User-Agent': 'request'
        }
      };

      var firebaseUID = req.query.firebaseUID;

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);

          addUserDataToDb(firebaseUID, info);
          res.status(200).send(info);
        } else {
          res.status(200).send("Error retriving the response: ");
        }
      }

      request(options, callback);
    } else {
      res.status(200).send("Must provide and 'gitToken' GET parameter ");
    }


  } else
    res.status(200).send('OPTIONS Request SUCCESS');

}]);



//  ==== FUNCTIONS PART ====
function addUserDataToDb(firebaseUID, userObj) {
  db.ref("/users").child(firebaseUID).update(userObj);
}


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
