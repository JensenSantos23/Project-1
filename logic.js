// Initialize Firebase
var config = {
    apiKey: "AIzaSyCpoukjeJfzglcf4glOHg2uuNbo9Ni8I9E",
    authDomain: "bootcamp-2cbb6.firebaseapp.com",
    databaseURL: "https://bootcamp-2cbb6.firebaseio.com",
    projectId: "bootcamp-2cbb6",
    storageBucket: "bootcamp-2cbb6.appspot.com",
    messagingSenderId: "150206119197"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

  var name = ""
  var email = ""
  var team = ""

  database.ref().on("value", function(snapshot){
    console.log(snapshot.val())

  })

  $("#submit-info").on("click", function(event) {
      event.preventDefault();

    name = $("#name-input").val().trim()
    email = $("#email-input").val().trim()
    team = $("#team-input").val().trim()
  })