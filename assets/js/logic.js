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

  database.ref().on("child_added", function(snapshot) {
    var tr = $("<tr>");
    $("tbody").append(tr);

    tr.append("<td>" + snapshot.val().trainName + "</td>");
    tr.append("<td>" + snapshot.val().destination + "</td>");
    tr.append("<td>" + snapshot.val().frequency + "</td>");
    tr.append("<td>" + snapshot.val().firstTrain + "</td>");

    console.log(snapshot);
  });
  //   var tFrequency = 7;

  //     // Time is 3:30 AM
  //     var firstTime = "05:00";

  //     // First Time (pushed back 1 year to make sure it comes before current time)
  //     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  //     // console.log(moment(firstTime, "HH:mm"));
  //     // console.log(firstTimeConverted);

  //     // Current Time
  //     var currentTime = moment();
  //     // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  //     // Difference between the times
  //     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  //     console.log("DIFFERENCE IN TIME: " + diffTime);

  //     // Time apart (remainder)
  //     var tRemainder = diffTime % tFrequency;
  //     console.log(tRemainder);

  //     // Minute Until Train
  //     var tMinutesTillTrain = tFrequency - tRemainder;
  //     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  //     // Next Train
  //     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  //     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  //   </script>

  // </body>

  // </html>
});
