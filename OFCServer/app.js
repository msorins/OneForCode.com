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

    addProjects(req.query.firebaseUID, req.body);

    res.status(200).send(JSON.stringify("OK"));

  } else
    res.status(200).send('OPTIONS Request SUCCESS');

}]);

app.use('/api/feature-projects/new', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    addFeature(req.query.firebaseUID, req.query.title, req.body);

    res.status(200).send(JSON.stringify("OK"));

  } else
    res.status(200).send('OPTIONS Request SUCCESS');

}]);

app.use('/api/contribution-projects/new', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {
    response = req.body;

    addContribution(req.query.firebaseUID, req.query.title, req.body);

    res.status(200).send(JSON.stringify("OK"));

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
      res.status(200).send("OK");
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
      res.status(200).send("OK");
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
    res.status(200).send('OK');
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

app.use('/api/payments/get/ch?', [hasFirebaseJWT, checkSameJWT, function(req, res, next) {
  if (req.method != 'OPTIONS') {
    addChargeToPaymentsQueue(req.query.firebaseUID, req.body.byUserName, req.body.token, req.body.amount);
    res.status(200).send('Request received');
  } else
    res.status(200).send('OPTIONS Request');
}]);


//  ==== FUNCTIONS PART ====
function addUserDataToDb(firebaseUID, userObj) {
  //Receives the firebaseUID and an object containing userInfo (from github)
  //Adds specific proprieties to that value if it doesn't exists
  getUserDB(firebaseUID, function(value) {
    userObj["ch"] = 1;

    if(value != null && value.hasOwnProperty("ch"))
      userObj["ch"] = value["ch"];

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

  refProjects.once("value", function(snapshot) {
    userProjects = snapshot.val();

    //Add the current project to the database
    db.ref("/").child("projects").child(firebaseUID).child(projectObj.title).update(projectObj);

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

}

function addFeature(firebaseUID, projectName, featureObj) {
  //Adds received feature to FfireBase
  db.ref("/").child("projects").child(firebaseUID).child(projectName).child("features").child(featureObj.title).update(featureObj);

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
    userProjects = snapshot.val();

    //Send the response
    callback(userProjects);

  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function listProjectsByTitle(title, callback) {
  var refProjects = db.ref("/").child("projects");

  refProjects.once("value", function(snapshot) {
    userProjects = snapshot.val();

    res = {};
    for(firebaseUID in userProjects) {
      for(key in userProjects[firebaseUID]) {
        if(userProjects[firebaseUID][key]["title"] == title) {
          res = userProjects[firebaseUID][key];
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

  //Prepare and send the notification
  //First get the userName of the owner of the project
  getUserDB(firebaseUID, function(result) {

    var notificationObject = {
      "id": 2,
      "message": result.login + " accepted your contribution",
      "url": "project/" + projectTitle

    };

    //Next get the firebaseUID of the one whose contribution got accepted
    db.ref("/").child("projects").child(firebaseUID).child(projectTitle).child("contributions").child(gitPullUid).child("byFirebaseUID").once("value", function(snapshot) {
      //Send the actual notification
      sendNotifications(snapshot.val(), notificationObject)
    });


  });

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

function addChargeToPaymentsQueue(firebaseUID, byUserName, token, amount) {
  //Add a new payment to the list of payments
  var refPayments = db.ref("/").child("payments").once("value", function(snapshot) {
    payments = snapshot.val();

    //If the payments section does not exist, create it
    if(payments == null) {
      payments = {};
      db.ref("/").child("payments").set({});
    }

    //Get the number of current payments objects
    nrOfPayments = Object.keys(payments).length;

    //Add the latest payment requests
    db.ref("/").child("payments").child(nrOfPayments).set({
      firebaseUID: firebaseUID,
      byUserName: byUserName,
      token: token,
      amount: amount,
      status: 'waiting'
    })

  });

}

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
