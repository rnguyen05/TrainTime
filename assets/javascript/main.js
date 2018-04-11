
// Initialize Firebase
var config = {
  apiKey: "AIzaSyB1T_mDzhPbvDp5g6Z_84B3z1b3AAnei74",
  authDomain: "trainschedule-190e4.firebaseapp.com",
  databaseURL: "https://trainschedule-190e4.firebaseio.com",
  projectId: "trainschedule-190e4",
  storageBucket: "",
  messagingSenderId: "195704662876"
};
firebase.initializeApp(config);

var trainSchedulesRef = firebase.database().ref("schedules");


//Get data from user input form
$("#submit").on('click', function(){
  var train = $("#train_name").val().trim();
  var destination = $("#destination").val().trim();
  var frequency = $("#frequency").val().trim();
  var firstTrain = $("#firstTrain").val().trim();

  //Add user input to database 
  trainSchedulesRef.push({
              trainName: train,
              destination: destination,
              frequency: frequency,
              firstTrain: firstTrain
          })
  })

//Display data from database to DOM
trainSchedulesRef.on('child_added', function(snapshot) {
  //Train Frequency
  var tfreq = snapshot.val().frequency;
  var convertedDate = moment(snapshot.val().firstTrain, 'hh:mm').subtract(1, 'years');
  var trainTime = moment(convertedDate).format('HH:mm');
  var currentTime = moment();
  var firstTimeConverted = moment(trainTime,'hh:mm').subtract(1, 'years');
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tfreq;
  var tMinsToTrain = tfreq - tRemainder;
  var nextTrain = moment().add(tMinsToTrain, 'minutes').format('HH:mm')

  //Display to DOM
  $("#schedule").append("<tr><td>" + snapshot.val().trainName + "</td><td>" +
  snapshot.val().destination + "</td><td>" + snapshot.val().frequency +
  "</td><td>" + trainTime + "</td><td>" + tMinsToTrain + "</td></tr>")
  },function(errorObject) {
    console.log('Errors: ' + errorObject.code);
  })

//Refresh every minute
setInterval(function(){
    location.reload();
  }, 60000)
