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
  // database.ref().on("child_added", function(childSnap) {

  // });

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

  database.ref().on("child_added", function(snapshot) {
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var nextArrival = snapshot.val().nextArrival;
    var minutesAway = snapshot.val().minutesAway;
    var firstTrain = snapshot.val().firstTrain;
    var tr = $("<tr>");
    $("tbody").append(tr);
    console.log(snapshot.val());
    tr.append("<td>" + trainName + "</td>");
    tr.append("<td>" + destination + "</td>");
    tr.append("<td>" + frequency + "</td>");

    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract("1, years");
    console.log(firstTrainConverted);
    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

    var remainder = diffTime % frequency;

    var tMinutesTillTrain = frequency - remainder;
    moment(tMinutesTillTrain).minutes();

    var nextTrain = moment()
      .add(tMinutesTillTrain, "minutes")
      .format("hh:mm a");
    tr.append("<td>" + nextTrain + "</td>");
    tr.append("<td>" + tMinutesTillTrain + "</td>");

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
  });
});
