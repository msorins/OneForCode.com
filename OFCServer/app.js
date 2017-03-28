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

// ===== API PART =====

function parseRepos(str) {
    res = [];
    for(var key in str) {
        crtObj = {};
        crtObj["repo_id"] = str[key].id;
        crtObj["owner_name"] = str[key].owner.name;
        crtObj["name"] = str[key].name;
        crtObj["html_url"] = str[key].html_url;
        crtObj["language"] = str[key].language;

        res.push(crtObj);
    }

    return JSON.stringify(res);
}

CLIENT_ID = "d2911925423f70c339c5";
CLIENT_SECRET = "28d5b2b4135993ab67045843e17188f28a8e0b29";

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

app.use('/api/projects/new', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.firebaseUID == null)
      res.send(200).send("Must contain a firebaseUID");
    else {
      addProjects(req.query.firebaseUID, req.body);
      res.status(200).send(JSON.stringify({"Response": 'OK'}));
    }


  } else
    res.status(200).send('OPTIONS Request SUCCESS');

}]);

app.use('/api/feature-projects/new', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.firebaseUID == null || req.query.title == null)
      res.send(200).send("Must contain a firebaseUID and a titleparameter");
    else {
      addFeature(req.query.firebaseUID, req.query.title, req.body);
      res.status(200).send(JSON.stringify({"Response": 'OK'}));
    }


  } else
    res.status(200).send('OPTIONS Request SUCCESS');

}]);

app.use('/api/contribution-projects/new', [hasFirebaseJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    addContribution(req.query.firebaseUID, req.query.title, req.body);

    res.status(200).send(JSON.stringify({"Response": 'OK'}));

  } else
    res.status(200).send('OPTIONS Request SUCCESS');

}]);

app.use('/api/projects/features/byTitle', [function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.firebaseUID == null || req.query.title == null)
      res.status(200).send(JSON.stringify("Missing get parameter: 'firebaseUID' of 'title"));
    else {
        listFeaturesByTitle(req.query.firebaseUID, req.query.title, function(result) {
          res.status(200).send(result);
      });
    }

  } else
    res.status(200).send('OPTIONS Request');

}]);

app.use('/api/projects/contributions/byTitle', [function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.firebaseUID == null || req.query.title == null)
      res.status(200).send(JSON.stringify("Missing get parameter: 'firebaseUID' of 'title"));
    else {
      listContributionsByTitle(req.query.firebaseUID, req.query.title, function(result) {
        res.status(200).send(result);
      });
    }

  } else
    res.status(200).send('OPTIONS Request');

}]);

app.use('/api/projects/contributions/accept', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.firebaseUID == null || req.query.title == null || req.query.gitPullId == null)
      res.status(200).send(JSON.stringify("Missing get parameter: 'firebaseUID' or 'title' or 'gitPullId'"));
    else {
      acceptContribution(req.query.firebaseUID, req.query.title, req.query.gitPullId, function(result) {
        res.status(200).send(result);
      });
    }

  } else
    res.status(200).send('OPTIONS Request');

}]);

app.use('/api/projects/contributions/deny', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.firebaseUID == null || req.query.title == null || req.query.gitPullId == null)
      res.status(200).send(JSON.stringify("Missing get parameter: 'firebaseUID' or 'title' or 'gitPullId'"));
    else {
      denyContribution(req.query.firebaseUID, req.query.title, req.query.gitPullId, function(result) {
        res.status(200).send(result);
      });
    }

  } else
    res.status(200).send('OPTIONS Request');

}]);

app.use('/api/projects/byUser', [function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.firebaseUID == null)
      res.status(200).send(JSON.stringify("Missing get parameter: 'firebaseUID'"));
    else {
      listProjectsByUser(req.query.firebaseUID, function(result) {
        res.status(200).send(result);
      });
    }

  } else
    res.status(200).send('OPTIONS Request');

}]);

app.use('/api/projects/byTitle', [function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.title == null)
      res.status(200).send(JSON.stringify("Missing get parameter: 'title'"));
    else {
      listProjectsByTitle(req.query.title, function(result) {
          res.status(200).send(result);
      });
    }

  } else
    res.status(200).send('OPTIONS Request');

}]);

app.use('/api/projects/getPulls', [function(req, res, next) {
  /*
   @Input: GET parameter 'gitUserName' and 'gitRepoName'
   @Returns: JSON with all pull requests of that repository
   */
  if (req.method != 'OPTIONS') {
    if(req.query.gitUserName != null && req.query.gitRepoName != null) {

      var options = {
        url: 'https://api.github.com/repos/' + req.query.gitUserName + '/' + req.query.gitRepoName + '/pulls?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
        headers: {
          'User-Agent': 'request'
        }
      };

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);

          res.status(200).send(info);
        } else {
          res.status(200).send("Error retriving the response: ");
        }
      }

      request(options, callback);
    } else {
      res.status(200).send("Must provide and 'gitUserName' and 'gitRepoName' GET parameters");
    }

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

      var firebaseUID = req.query.firebaseUID;
      getUserDB(firebaseUID, function(result) {
        //console.log(result);
        if(result == null) {
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
          res.status(200).send(JSON.stringify(result));
        }
      });

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
      var firebaseUID = req.query.firebaseUID;

      getUserDB(firebaseUID, function(result) {
          if(result == null) {
            //Send a request to GIT API to get basic info about the user (1st time)
            var options = {
              url: 'https://api.github.com/user?access_token='+req.query.gitToken,
              headers: {
                'User-Agent': 'request'
              }
            };

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
            res.status(200).send(JSON.stringify(result));
          }

      });

    } else {
      res.status(200).send("Must provide and 'gitToken' GET parameter ");
    }
  }
    else
      res.status(200).send('OPTIONS Request SUCCESS');

}]);


app.use('/api/users/get/profile', [function(req, res, next) {
  /*
   @Input: GET parameter 'gitToken' and 'firebaseUID'
   @Returns: JSON with Git user info
   */
  if (req.method != 'OPTIONS') {
    if(req.query.username != null) {

      if(req.query.firebaseUID != null)
        getUserProfile(req.query.username, req.query.firebaseUID, function(result) {
          res.status(200).send(result);
        });
      else
        getUserProfile(req.query.username, '', function(result) {
          res.status(200).send(result);
        });

    } else {
      res.status(200).send("Must provide an username GET parameter ");
    }
  }
  else
    res.status(200).send('OPTIONS Request SUCCESS');
}]);

app.use('/api/users/save/profile', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  /*
   @Input: GET parameter 'gitToken' and 'firebaseUID'
   @Returns: JSON with Git user info
   */
  if (req.method != 'OPTIONS') {
    if(req.query.firebaseUID != null) {

      saveUserProfile(req.query.firebaseUID, req.body, function(result) {
        res.status(200).send(result);
      });

    } else {
      res.status(200).send("Must provide an firebaseUID GET parameter ");
    }
  }
  else
    res.status(200).send('OPTIONS Request SUCCESS');
}]);


app.use('/api/projects/setNews', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.firebaseUID == null || req.query.title == null)
      res.status(200).send(JSON.stringify("Missing get parameter: 'firebaseUID' of 'title"));
    else {
      setNews(req.query.firebaseUID, req.query.title, req.body, function(result) {
        res.status(200).send(result);
      });
    }

  } else
    res.status(200).send('OPTIONS Request');

}]);

app.use('/api/projects/getNews', [function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.firebaseUID == null || req.query.title == null)
      res.status(200).send(JSON.stringify("Missing get parameter: 'firebaseUID' of 'title"));
    else {
      listNews(req.query.firebaseUID, req.query.title, function(result) {
        res.status(200).send(result);
      });
    }

  } else
    res.status(200).send('OPTIONS Request');

}]);

app.use('/api/notifications/new', [hasFirebaseJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.firebaseUID == null)
      res.status(200).send(JSON.stringify("Missing get parameter: firebaseUID"));
    else {
      sendNotifications(req.query.firebaseUID, response);
      res.status(200).send(JSON.stringify({"Response": 'OK'}));
    }

  } else
    res.status(200).send('OPTIONS Request');

}]);

app.use('/api/notifications/delete', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    if(req.query.firebaseUID == null)
      res.status(200).send(JSON.stringify("Missing get parameter: firebaseUID"));
    else {
      deleteNotification(req.query.firebaseUID, response);
      res.status(200).send(JSON.stringify({"Response": 'OK'}));
    }

  } else
    res.status(200).send('OPTIONS Request');

}]);


//Multer configuration for saving project headers
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //Path to saving directory

    // PRODUCTION LINK
    var dest = "../src/client/assets/img/projects/header/";
    // var dest = "uploads/header/";

    mkdirp.sync(dest);
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, req.body["fileName"] + ".jpg")
  }
});

var upload = multer({ storage: storage }).single('file');

app.post('/api/projects/upload/header', [function(req, res, next) {

  //Upload the image file received through POST request
  upload(req, res, function (err) {
    if (err) {
      res.status(500).send('Something went wrong');
      return
    }

    // Everything is fine, image uploaded
    res.status(200).send(JSON.stringify({"Response": 'OK'}));
  });
}]);

app.use('/api/projects/features/setLargeDescription', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {

    if(req.query.firebaseUID == null || req.query.projectTitle == null || req.query.featureTitle == null)
      res.status(200).send(JSON.stringify("Missing get parameter: firebaseUID or projectTitle or featureTitle"));
    else {
      response = req.body;
      setProjectFeatureLargeDescription(req.query.firebaseUID, req.query.projectTitle, req.query.featureTitle, response["content"], function(result) {
        res.status(200).send(result);
      });
    }
  } else
    res.status(200).send('OPTIONS Request');

}]);

app.use('/api/projects/features/setQuestions', [hasFirebaseJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {

    if(req.query.firebaseUID == null || req.query.projectTitle == null || req.query.featureTitle == null)
      res.status(200).send(JSON.stringify("Missing get parameter: firebaseUID or projectTitle or featureTitle"));
    else {
      response = req.body;
      setProjectQuestions(req.query.firebaseUID, req.query.projectTitle, req.query.featureTitle, response["content"], function(result) {
        res.status(200).send(result);
      });
    }
  } else
    res.status(200).send('OPTIONS Request');

}]);

app.use('/api/projects/all', [function(req, res, next) {
  if (req.method != 'OPTIONS') {
      listAllProjects(function(result) {
        res.status(200).send(result);
      });
  } else
    res.status(200).send('OPTIONS Request');
}]);

app.use('/api/projects/top', [function(req, res, next) {
  if (req.method != 'OPTIONS') {
    var limit;
    if(req.query.limit == null)
      limit = 10;
    else
      limit = req.query.limit;

    listTopProjects(limit, function(result) {
      res.status(200).send(result);
    });


  } else
    res.status(200).send('OPTIONS Request');
}]);

app.use('/api/payments/get/ch', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {

  if (req.method != 'OPTIONS') {

    if(req.query.firebaseUID == null)
      res.status(200).send(JSON.stringify("Missing get parameter: firebaseUID"));
    else {
      console.log(JSON.stringify(req.body));
      addChargeToPaymentsQueue(req.query.firebaseUID, req.body.byUserName, req.body.token, req.body.amount, req.body.ch);
      res.status(200).send(JSON.stringify({"Response": 'OK'}));
    }
  } else
    res.status(200).send('OPTIONS Request');
}]);

app.use('/api/payments/getHistory', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {

    if(req.query.firebaseUID == null)
      res.status(200).send(JSON.stringify("Missing get parameter: firebaseUID"));
    else {
      listPaymentsOfUser(req.query.firebaseUID, function(result) {
        res.status(200).send(result);
      });

    }
  } else
    res.status(200).send('OPTIONS Request');
}]);

app.use('/api/activities/get', [function(req, res, next) {
  if (req.method != 'OPTIONS') {

    if(req.query.firebaseUID == null)
      res.status(200).send(JSON.stringify("Missing get parameter: firebaseUID"));
    else {

      getActivities(req.query.firebaseUID, function(result) {
        res.status(200).send(result);
      });

    }
  } else
    res.status(200).send('OPTIONS Request');
}]);

app.use('/api/admin/updateAwards', [function(req, res, next) {
  if (req.method != 'OPTIONS') {

    //Force the
    giveUsersAwards();
    res.status(200).send({"Response": 'OK'});

  } else
    res.status(200).send('OPTIONS Request');
}]);



//  ==== FUNCTIONS PART ====
function addUserDataToDb(firebaseUID, userObj) {
  //Function is called just when a new user registers on the WEBSITE
  //Receives the firebaseUID and an object containing userInfo (from github)
  //Adds specific proprieties to that value if it doesn't exists
  getUserDB(firebaseUID, function(value) {
    userObj["ch"] = 1;

    if(value != null && value.hasOwnProperty("ch"))
      userObj["ch"] = value["ch"];

    //Prepare and send the activity object
    var activityObj = {};
    activityObj["message"] = "Registered on OFC :)";
    activityObj["url"] = "profile/" + userObj["login"];
    activityObj["timeline"] = true;
    addActivity(firebaseUID, activityObj);

    db.ref("/users").child(firebaseUID).update(userObj);
  });

}

function getUserDB(firebaseUID, callback) {
  //Receives the firebaseUID and returns through a callback function the database
  var refUser = db.ref("/").child("users").child(firebaseUID);

  refUser.once("value", function(snapshot) {
    callback(snapshot.val());
  })
}

function addProjects(firebaseUID, projectObj) {
  //Receives the firebaseUID of the users and an object containing the project info
  //Adds it to the firebase database
  var refProjects = db.ref("/").child("projects").child(firebaseUID);

  delete projectObj['$key'];

  //Create or update the firebase database section
  db.ref("/").child("projects").child(firebaseUID).child(projectObj.title).update(projectObj);

  //Add a new activity
  var activityObj = {};
  activityObj["message"] = projectObj["title"] + " project was created";
  activityObj["url"] = "project/" + projectObj["title"];
  activityObj["timeline"] = true;
  addActivity(firebaseUID, activityObj);
}

function addFeature(firebaseUID, projectName, featureObj) {
  //Adds received feature to FfireBase
  db.ref("/").child("projects").child(firebaseUID).child(projectName).child("features").child(featureObj.title).update(featureObj);

  //Add a new activity
  var activityObj = {};
  activityObj["message"] = "Feature " + featureObj["title"] + " was added on project " + projectName;
  activityObj["url"] = "project/" + projectName;
  activityObj["timeline"] = true;
  addActivity(firebaseUID, activityObj);

}

function addContribution(firebaseUID, projectName, featureObj) {
  //Adds received feature to FfireBase
  db.ref("/").child("projects").child(firebaseUID).child(projectName).child("contributions").child(featureObj.gitPullId).update(featureObj);

  //Prepare and send the notification
  var notificationObject = {
    "id": 1,
    "message": featureObj.byUserName + " contributed to " + projectName,
    "url": "project/" + projectName
  };

  sendNotifications(firebaseUID, notificationObject)

  //Add a new activity for the user who added the contribution
  var activityObj = {};
  activityObj["message"] = "Added a contribution on feature " + featureObj["featureTitle"] + " of the project "  + projectName;
  activityObj["url"] = "project/" + projectName;
  activityObj["timeline"] = true;
  activityObj["type"] = "Icontributed";
  addActivity(featureObj.byFirebaseUID, activityObj);
}

function listFeaturesByTitle(firebaseUID, projectTitle, callback) {
  var refProjects = db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("features");

  refProjects.once("value", function(snapshot) {
    userProjectsFeatures = snapshot.val();

    res = [];
    for(key in userProjectsFeatures) {
      res.push(userProjectsFeatures[key]);
    }

    callback(JSON.stringify(res));

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function listContributionsByTitle(firebaseUID, projectTitle, callback) {
  var refProjects = db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("contributions");

  refProjects.once("value", function(snapshot) {
    userProjectsContributions= snapshot.val();

    res = [];
    for(key in userProjectsContributions) {
      res.push(userProjectsContributions[key]);
    }

    callback(JSON.stringify(res));

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function listProjectsByUser(firebaseUID, callback) {
  var refProjects = db.ref("/").child("projects").child(firebaseUID);

  refProjects.once("value", function(snapshot) {
    userPayments = snapshot.val();

    //Send the response
    callback(userPayments);

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function listProjectsByTitle(title, callback) {
  var refProjects = db.ref("/").child("projects");

  refProjects.once("value", function(snapshot) {
    userPayments = snapshot.val();

    res = {};
    for(firebaseUID in userPayments) {
      for(key in userPayments[firebaseUID]) {
        if(userPayments[firebaseUID][key]["title"] == title) {
          res = userPayments[firebaseUID][key];
          res["byFirebaseUID"] = firebaseUID;
          res["key"] = key;

          break;
        }

      }
    }

    callback(res);

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function listAllProjects(callback) {
  /*
   Returns through callback a list with all projects
   */
  db.ref("/").child("projects").once("value", function(snapshot) {
    dbObj = snapshot.val();
    res = [];

    for(firebaseUID in dbObj) {
      for(key in dbObj[firebaseUID]) {
        obj = dbObj[firebaseUID][key]; //Here in the future I can minimise the object size that I send over
        res["byFirebaseUID"] = firebaseUID;
        res["key"] = key;
        res.push(obj);
        }

      }

      callback(res);
  })
}

function listTopProjects(limit, callback) {
  /*
   Returns through callback a list with the top projects
   */
  db.ref("/").child("projects").once("value", function(snapshot) {
    dbObj = snapshot.val();
    res = [];

    for(firebaseUID in dbObj) {
      for(key in dbObj[firebaseUID]) {
        obj = dbObj[firebaseUID][key]; //Here in the future I can minimise the object size that I send over
        res["byFirebaseUID"] = firebaseUID;
        res["key"] = key;
        res.push(obj);
      }
    }

    //Sort the return Object
    res = sortProjectsTop(res);

    //Splice and return it
    callback(res.slice(0, limit));
  })
}

function sortProjectsTop(obj) {
  return obj.sort(function(a, b) {
    var nrA = 0;
    var nrB = 0;

    if(typeof(a.features) != 'undefined')
      nrA += Object.keys(a.features).length;

    if(typeof(b.features) != 'undefined')
      nrB += Object.keys(b.features).length;


    if(typeof(a.features) != 'undefined' && typeof(a.features.questions) != 'undefined')
      nrA += Object.keys(a.features.questions).length;

    if(typeof(b.features) != 'undefined' && typeof(b.features.questions) != 'undefined')
      nrB += Object.keys(b.features.questions).length;

    if(typeof(a.contributions) != 'undefined')
      nrA += Object.keys(a.contributions).length;
    if(typeof(b.contributions) != 'undefined')
      nrB += Object.keys(b.contributions).length;


    if(nrA < nrB)
      return 1;
    else
      return 0;
  });
}

function acceptContribution(firebaseUID, projectTitle, gitPullUid, callback) {

  //Set the contribution as accepted
  db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("contributions").child(gitPullUid).child("status").set("accepted");

  var refContribution = db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("contributions").child(gitPullUid);

  refContribution.once("value", function(snapshot) {
     contribution = snapshot.val();

     featureTitle = contribution["featureTitle"];
     //Set the feature as completed
     db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("features").child(featureTitle).child("status").set("completed");

  });

  // ## Send Notifications and Add Activity ##
  // First get the userName of the owner of the project
  getUserDB(firebaseUID, function(result) {

    var notificationObject = {
      "id": 2,
      "message": result.login + " accepted your contribution",
      "url": "project/" + projectTitle

    };

    //Next get the firebaseUID of the one whose contribution got accepted
    db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("contributions").child(gitPullUid).once("value", function(snapshot) {
      var contributionObject = snapshot.val();

      //Send the actual notification
      sendNotifications(contributionObject["byFirebaseUID"], notificationObject);

      //Add a new activity for the user whose contribution got accepted
      var activityObj = {};
      activityObj["message"] = "I completed the feature " + contributionObject["featureTitle"] +" of the project "  + projectTitle;
      activityObj["ch"] = contributionObject["ch"];
      activityObj["url"] = "project/" + projectTitle;
      activityObj["timeline"] = true;
      activityObj["type"] = "ICompletedFeature";
      addActivity(contributionObject["byFirebaseUID"], activityObj);

      //Add a new activity for the owner of the project
      activityObj = {};
      activityObj["message"] = "Feature " + contributionObject["featureTitle"] + " got completed by " + contributionObject["byUserName"];
      activityObj["ch"] = contributionObject["ch"];
      activityObj["url"] = "project/" + projectTitle;
      activityObj["timeline"] = true;
      addActivity(firebaseUID, activityObj);
    });
  });


  //Add CH contributing user

  /* TO DO */

  //Return the list of modified contributions
  listContributionsByTitle(firebaseUID, projectTitle, function(result) {
    callback(result);
  });

}

function denyContribution(firebaseUID, projectTitle, gitPullUid, callback) {
  db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("contributions").child(gitPullUid).child("status").set("denied");

  //Prepare and send the notification
  //First get the userName of the owner of the project
  getUserDB(firebaseUID, function(result) {

    var notificationObject = {
      "id": 3,
      "message": result.login + " denied your contribution",
      "url": "project/" + projectTitle

    };

    //Next get the firebaseUID of the one whose contribution got denied
    db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("contributions").child(gitPullUid).child("byFirebaseUID").once("value", function(snapshot) {
      //Send the actual notification
      sendNotifications(snapshot.val(), notificationObject)
    });


  });

  listContributionsByTitle(firebaseUID, projectTitle, function(result) {
    callback(result);
  });
}

function setNews(firebaseUID, projectTitle, newsObj, callback) {
  db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("news").set(newsObj);

  listNews(firebaseUID, projectTitle, function(result) {
    callback(result);
  });
}

function listNews(firebaseUID, projectTitle, callback) {
  var refProjects = db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("news");

  refProjects.once("value", function(snapshot) {
    userProjectsNews = snapshot.val();

    res = [];
    for(key in userProjectsNews) {
      res.push(userProjectsNews[key]);
    }

    callback(JSON.stringify(res));

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function setProjectFeatureLargeDescription(firebaseUID, projectTitle, featureTitle, largeDescription, callback) {
  db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("features").child(featureTitle).child("largeDescription").set(largeDescription);

  listProjectsByTitle(projectTitle, function(result) {
    callback(result);
  });

}

function setProjectQuestions(firebaseUID, projectTitle, featureTitle, largeDescription, callback) {
  db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("features").child(featureTitle).child("questions").set(largeDescription);

  listProjectsByTitle(projectTitle, function(result) {
    callback(result);
  });

}

function sendNotifications(firebaseUID, notificationObject) {
  /*
    fiebaseUID: of the user who received the notification
    message: a string with the actual message
    idNotification: integer

   */

  var refNews = db.ref("/").child("notifications").child(firebaseUID);

  refNews.once("value", function(snapshot) {
    var snapshotValue = snapshot.val();

    if(snapshotValue == null)
      snapshotValue = [];

    notificationObject["timestamp"] = new Date().getTime().toLocaleString();
    snapshotValue.push(notificationObject);
    db.ref("/").child("notifications").child(firebaseUID).set(snapshotValue);

  })
}

function deleteNotification(firebaseUID, notificationsObj) {
  db.ref("/").child("notifications").child(firebaseUID).set(notificationsObj);
}

function addChargeToPaymentsQueue(firebaseUID, byUserName, token, amount, ch) {
  //Add a new payment to the list of payments
  var refPayments = db.ref("/").child("payments").child(firebaseUID).once("value", function(snapshot) {
    payments = snapshot.val();

    //If the payments section does not exist, create it
    if(payments == null) {
      payments = {};
      db.ref("/").child("payments").child(firebaseUID).set({});
    }

    //Get the number of current payments objects
    nrOfPayments = Object.keys(payments).length;

    //Add the latest payment requests
    db.ref("/").child("payments").child(firebaseUID).child(nrOfPayments).set({
      firebaseUID: firebaseUID,
      byUserName: byUserName,
      token: token,
      amount: amount,
      status: 'waiting',
      ch: ch,
      timestamp: new Date().getTime().toLocaleString()
    });

  });
}

function listPaymentsOfUser(firebaseUID, callback) {
    var refPayments = db.ref("/").child("payments").child(firebaseUID);

    refPayments.once("value", function(snapshot) {
      userPayments = snapshot.val();

      var res = [];
      for(key in userPayments) {
        var newObj = userPayments[key];
        newObj.key = key;
        res.push(newObj);
      }

      callback(res);

    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

}

function getUserProfile(name, firebaseUID, callback) {
  /*
    Return an object with the following properties
     name: string,
     username: string,
     githubUrl: string,
     avatarUrl: string
     websiteUrl: string,
     bio: string
   */

  var resObject = {};

  //If the firebaseUID property does exist than directly get the user data
  if(firebaseUID != '') {
    db.ref("/").child("users").child(firebaseUID).once("value", function(snapshot) {
      user = snapshot.val();
      //Return the filtered object
      callback(filterUserProfile(user));
    });
  } else {
    //Otherwise must loop through all the users and get the
    db.ref("/").child("users").once("value", function(snapshot) {
      console.log('THAT IS OKAY');
      user = snapshot.val();

      var found = false;
      for(var key in user) {
        if(user[key]['login'] == name) {
          console.log("FOUND");
          found = true;
          callback(filterUserProfile(user[key]));
          break;
        }
      }
      if(!found) {
        callback(filterUserProfile({}));
      }

    })

  }
}

function saveUserProfile(firebaseUID, obj, callback) {
  /*
   Updates the user profile
   */

  db.ref("/").child("users").child(firebaseUID).update(obj);
}

function filterUserProfile(obj) {
  /*
  Receives all the users object and only outputs what is needed for profile
   */
  var resObject = {};

  resObject['name'] = obj['name'];
  resObject['username'] = obj['login'];
  resObject['githubUrl'] = obj['html_url'];
  resObject['avatarUrl'] = obj['avatar_url'];
  resObject['blog'] = obj['blog'];
  resObject['bio'] = obj['bio'];

  if(resObject['blog'] == null)
    resObject['blog'] = '';

  if(resObject['bio'] == null)
    resObject['bio'] = '';

  return resObject;
}

function convertFiltering(obj) {
  /*
  Basically inverts the functionality of last function
   */

  obj['html_url'] = resObject['githubUrl'];
  obj['avatar_url'] = resObject['avatarUrl'];

  delete(resObject['githubUrl']);
  delete(resObject['avatarUrl']);

  return obj;
}

function addActivity(firebaseUID, activityObject) {
  /*
    Adds a new activity to user with given firebaseUID
   */
  var refActivities = db.ref("/").child("activities").child(firebaseUID);

  refActivities.once("value", function(snapshot) {
    var snapshotValue = snapshot.val();

    if(snapshotValue == null)
      snapshotValue = [];

    activityObject["timestamp"] = new Date().getTime().toLocaleString();
    snapshotValue.push(activityObject);
    db.ref("/").child("activities").child(firebaseUID).set(snapshotValue);

  });
}

function getActivities(firebaseUID, callback) {
  var refActivities = db.ref("/").child("activities").child(firebaseUID);

  refActivities.once("value", function(snapshot) {
    var snapshotValue = snapshot.val();

    //Return the value
    callback(snapshotValue);
  });
}

function giveUsersAwards() {
  db.ref("/").child("users").once("value", function(snapshot) {
    users = snapshot.val();

    //For every user get his activity and computes its awards
    for(var keyUsers in users) {


      //Parse user activities for contributions type awards
      getActivities(keyUsers, function(activity) {

        var contributions = 0;
        var acceptedContributions = 0;

        for(var keyActivity in activity) {

          if(activity[keyActivity]["type"] == "Icontributed") {
              contributions++;
          }

          if(activity[keyActivity]["type"] == "ICompletedFeature") {
              acceptedContributions++;
          }

        }


        if(contributions >= 1) {
          var award = {};
          award.title = "Novice Contributor";
          award.id = "1";
          award.timestamp = new Date().getTime().toLocaleString();

          giveUserAward(keyUsers, award);
        }

        if(acceptedContributions >= 1) {
          var award = {};
          award.title = "Little helper";
          award.id = "2";
          award.timestamp = new Date().getTime().toLocaleString();

          giveUserAward(keyUsers, award);
        }

        if(contributions >= 20) {
          var award = {};
          award.title = "Veteran";
          award.id = "3";
          award.timestamp = new Date().getTime().toLocaleString();

          giveUserAward(keyUsers, award);
        }

        if(acceptedContributions >= 10) {
          var award = {};
          award.title = "Always Trusted";
          award.id = "4";
          award.timestamp = new Date().getTime().toLocaleString();

          giveUserAward(keyUsers, award);
        }

      });
    }

  })
}

function giveUserAward(firebaseUID, award) {
  var refActivities = db.ref("/").child("awards").child(firebaseUID).child(award.id);

  refActivities.once("value", function(snapshot) {
    var snapshotValue = snapshot.val();

    //User hasn't received this award yet
    if(snapshotValue == null) {

      db.ref("/").child("awards").child(firebaseUID).child(award.id).set(award);
    }

  });
}

giveUsersAwards();


/* ===== SECURITY FUNCTIONS ====== */
function hasFirebaseJWT(req, res, next) {
  var token = req.headers['x-access-token'];

  if (token) {
    firebaseAdmin.auth().verifyIdToken(token)
      .then(function(decodedToken) {
        //Here the token is succesfully verified
        var uid = decodedToken.uid;


      }).catch(function(error) {
      res.status(500).send( 'Authentication error !' );
    });
    next();
  } else {
    res.status(500).send( 'Authentication error !' );
  }
}

function checkSameJWT(req, res, next) {
  var givenToken = req.headers['x-access-token'];
  var requestedFirebaseUID = req.query.firebaseUID;

  //Decode received access token
  firebaseAdmin.auth().verifyIdToken(givenToken)
    .then(function(decodedToken) {
      //Here the token is succesfully verified
      var uid = decodedToken.uid;

      if(uid == requestedFirebaseUID)
        next();
      else
        res.status(500).send( 'Authentication error !' );

    }).catch(function(error) {
    res.status(500).send( 'Authentication error !' );
  });
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
