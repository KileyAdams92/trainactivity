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

    tr.append("<td>" + trainName + "</td>");
    tr.append("<td>" + destination + "</td>");
    tr.append("<td>" + frequency + "</td>");

    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log("First Train Converted: " + firstTrainConverted.format());
    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("Difftime: " + diffTime);

    var remainder = diffTime % frequency;

    var tMinutesTillTrain = frequency - remainder;
    moment(tMinutesTillTrain).minutes();
    console.log("Minutes until train: " + tMinutesTillTrain);

    var nextTrain = moment()
      .add(tMinutesTillTrain, "minutes")
      .format("hh:mm a");
    tr.append("<td>" + nextTrain + "</td>");
    tr.append("<td>" + tMinutesTillTrain + "</td>");
    console.log("Next train: " + nextTrain);

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
  });
  // Wrap every letter in a span
  $(".ml1 .letters").each(function() {
    $(this).html(
      $(this)
        .text()
        .replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
    );
  });

  anime
    .timeline({ loop: true })
    .add({
      targets: ".ml1 .letter",
      scale: [0.3, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 600,
      delay: function(el, i) {
        return 70 * (i + 1);
      }
    })
    .add({
      targets: ".ml1 .line",
      scaleX: [0, 1],
      opacity: [0.5, 1],
      easing: "easeOutExpo",
      duration: 700,
      offset: "-=875",
      delay: function(el, i, l) {
        return 80 * (l - i);
      }
    })
    .add({
      targets: ".ml1",
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 10000
    });
});
