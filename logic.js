//Capture Button Click
$("#submit-button").on("click", function(event) {
    // prevent form from trying to submit/refresh the page
    event.preventDefault();

    // Capture User Inputs and store them into variables
    var name = $("#name-input").val();
    var email = $("#email-input").val();
    var team = $("#team-input").val().replace(/\s+/g, '-');
    

    // Console log each of the user inputs to confirm we are receiving them
    console.log(name);
    console.log(email);
    console.log(team);
 
      var queryURL = "https://api.seatgeek.com/2/events?client_id=MTQxMzIwNjV8MTU0MzQ1OTIxMC4yNg&performers.slug=" + team;
      $.ajax({
       url: queryURL
      }).then(function(response) {
       console.log(response);
      $("#ticket-info").html(response.events[0].title);

      var eventURL = response.events[0].url;
      var event = $("<a>").attr("href", eventURL).text("Buy Tickets for the Next Game")
      $("#ticket-info1").append(event);
      
      $("#ticket-info2").append(response.events[0].venue.address);

      var imgURL = response.events[0].performers[1].image;
      var image = $("<img>").attr("src", imgURL);
      $("#ticket-info3").append(image);

      });

    // Output all of the new information into the relevant HTML sections
    $("#name-display").text(name);
    $("#email-display").text(email);
    $("#team-display").text(team);

    // Clear localStorage
    localStorage.clear();

    // Store all content into localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("team", team);
    

  // By default display the content from localStorage
  $("#name-display").text(localStorage.getItem("name"));
  $("#email-display").text(localStorage.getItem("email"));
  $("#team-display").text(localStorage.getItem("team"));

});

// //var queryURL = "http://api.sportradar.us/nba/trial/v5/en/seasons/2018/REG/standings.json?api_key=jfjvkawctrfhsskhejx55ykt";
// var queryURL = "http://api.sportradar.us/nba/trial/v5/en/games/22ca891e-3589-40d1-b9ca-31196c83b883/boxscore.json?api_key=jfjvkawctrfhsskhejx55ykt"
// $.ajax({
//   url: queryURL
// }).then(function(response) {
//   console.log(response);
// })

function searchFavoriteTeam(team) {
  var queryURL = "https://api.seatgeek.com/2/events?client_id=MTQxMzIwNjV8MTU0MzQ1OTIxMC4yNg&performers.slug=" + team;
  $.ajax({
   url: queryURL
  }).then(function(response) {
   console.log(response);
  })
}