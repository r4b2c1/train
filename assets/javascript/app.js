

 var config = {
    apiKey: "AIzaSyCF82zUoxt-_3F4kc6L53LZQOI8FySj7hk",
    authDomain: "fir-database-afd64.firebaseapp.com",
    databaseURL: "https://fir-database-afd64.firebaseio.com",
    projectId: "fir-database-afd64",
    storageBucket: "fir-database-afd64.appspot.com",
    messagingSenderId: "552934413419"
  };

firebase.initializeApp(config);

 

var database = firebase.database();


var trainname = "";

var destination = "";

var firsttime = "";

var frequency = "";

 

$("#addtrains").on("click", function(event){

    event.preventDefault();

    

    trainname = $("#train-input").val().trim();

    destination = $("#destination-input").val().trim();

    firsttime = $("#firsttrain-input").val().trim();

    frequency = $("#frequency-input").val().trim();

 

    // console.log("Train name: " + trainname);

    // console.log("Destination: " + destination);

    // console.log("First time: " + firsttime);

    // console.log("Frequency: " + frequency);

 

    $("#train-input").val("");

    $("#destination-input").val("");

    $("#firsttrain-input").val("");

    $("#frequency-input").val("");

 

    database.ref().push({

        trainname: trainname,

        destination: destination,

        firsttime: firsttime,

        frequency: frequency

    });

 

});

 

    database.ref().on("child_added", function(childSnapshot) {

      console.log(childSnapshot.val());

 

      trainname = childSnapshot.val().trainname;

      destination = childSnapshot.val().destination

      firsttime = childSnapshot.val().firsttime;

      frequency = childSnapshot.val().frequency;

 

      var firsttimeMoment = moment(firsttime, "HH:mm");

      // console.log("TIME CONVERTED: " + firsttimeMoment);


      var currenttime = moment();

      // console.log("Now TIME: " + currenttime);

 

     var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');

      var minuteLast = minuteArrival % frequency;

      var awayTrain = frequency - minuteLast;

 

      // console.log("Minutes: " + minuteArrival);

      // console.log("Minutes Last: " + minuteLast);

      // console.log("Away Train: " + awayTrain);

 

      var nextArrival = currenttime.add(awayTrain, 'minutes');

      var arrivaltime = nextArrival.format("HH:mm");

      // console.log("Away Arrival: " + nextArrival);

      // console.log("Arrival Time: " + arrivaltime);

 


    $("#AddTrain").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");

 


    }, function(errorObject) {

      console.log("Errors handled: " + errorObject.code);

    });