$(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgO8SwtbrjRIqUNt_lra0E25wwBKwl-yg",
    authDomain: "trainscheduler-2859f.firebaseapp.com",
    databaseURL: "https://trainscheduler-2859f.firebaseio.com",
    projectId: "trainscheduler-2859f",
    storageBucket: "",
    messagingSenderId: "117129776932"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Initial Values
  var trainName = "";
  var destination = "";
  var frequency = "";
  var nextArrival = "";
  var minutesAway = "";
  var firstTrain = "";

  $("#submit-train").on("click", function() {
    event.preventDefault();

    trainName = $("#train-name")
      .val()
      .trim();
    destination = $("#destination")
      .val()
      .trim();
    firstTrain = $("#first-train")
      .val()
      .trim();
    frequency = $("#frequency")
      .val()
      .trim();

    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    });
  });

  // database.ref().on("child_added", function (snapshot) {
  //     var tr = $("<tr>");

  //     tr.append("<td>" + snapshot.val().name + "</td>");
  //     tr.append("<td>" + snapshot.val().startDate + "</td>");
  //     tr.append("<td>" + snapshot.val().monthsWorked + "</td>");
  //     tr.append("<td>" + snapshot.val().monthlyRate + "</td>");
  //     tr.append("<td>" + snapshot.val().totalBilled + "</td>");

  //     console.log(snapshot);
});
