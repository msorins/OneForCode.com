var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var cors = require('cors');
var request = require('request');

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

// ===== API PART =====
app.use('/api/repos', [function(req, res, next) {
    if (req.method != 'OPTIONS') {
        var request = require('request');

        var options = {
            url: 'https://api.github.com/users/sorynsoo/repos',
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

}])

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
