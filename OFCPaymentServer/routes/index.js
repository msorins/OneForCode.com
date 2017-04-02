var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  makePayment(req.body);
  res.redirect('/');
});

module.exports = router;


var stripe = require("stripe")(
  "sk_test_ravWdsghPUxsHiCXFpE4KcKK"

);


function makePayment(req) {

  //Create the stripe charge
  stripe.charges.create({
    amount: req.amount * 100,
    currency: "eur",
    source: req.token, // obtained with Stripe.js
    description: "Charge for " + req.byUserName + " - " + req.firebaseUID
  }, function(err, charge) {
    console.log("Error in processing the transaction" + JSON.stringify(err));
    console.log("Charge" +  JSON.stringify(charge));

    if(err != null) {
      errorPayment(req.firebaseUID, req.dbFireBaseID, err);
    } else {
      if(charge.status == "succeeded") {
        successPayment(req.firebaseUID, req.dbFireBaseID);
        addUserCH(req.firebaseUID, req.amount);
      }
    }

  });

  console.log("MakePayment request" + JSON.stringify(req));
}


function successPayment(firebaseUID, dbFirebaseID) {
  //Set the payment status to success
  db.ref("/").child("payments").child(firebaseUID).child(dbFirebaseID).child("status").set("success");
}

function errorPayment(firebaseUID, dbFirebaseID, error) {
  //Set the payment status to error
  console.log("Error - " + firebaseUID);
  db.ref("/").child("payments").child(firebaseUID).child(dbFirebaseID).child("status").set("error");

  //And save the error
  db.ref("/").child("payments").child(firebaseUID).child(dbFirebaseID).child("error").set(error.message);
}

function addUserCH(firebaseUID, amount) {
  console.log("addUserCH - firebaseUID" + firebaseUID + "amount " +amount);
  var plusCH = 0;

  //Small Temporary conversion table
  if(amount == 4)
    plusCH = 1;
  else if(amount == 7)
    plusCH = 2;
  else if(amount == 18)
    plusCH = 5;
  else if(amount == 33)
    plusCH = 10;
  else if(amount == 132)
    plusCH = 50;

  db.ref("/").child("users").child(firebaseUID).child("ch").once("value", function(snapshot) {
    //Get current CH value
    ch = snapshot.val();

    //Increase it
    db.ref("/").child("users").child(firebaseUID).child("ch").set(ch + plusCH);
  });


  //Send a notification to user
  var notificationObject = {
    "id": 1,
    "message": plusCH +"ch points were added to your account (payment)",
    "url": "/get/ch"

  };

  sendNotifications(firebaseUID, notificationObject);
}


function sendNotifications(firebaseUID, notificationObject) {
  /*
   fiebaseUID: of the user who received the notification
   message: a string with the actual message
   idNotification: integer

   */

  notificationObject["timestamp"] = new Date().getTime().toLocaleString();
  db.ref("/").child("notifications").child(firebaseUID).push(notificationObject);

}
