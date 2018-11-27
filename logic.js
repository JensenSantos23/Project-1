//Capture Button Click
$("#add-user").on("click", function(event) {
    // prevent form from trying to submit/refresh the page
    event.preventDefault();

    // Capture User Inputs and store them into variables
    var name = $("#name-input").val().trim();
    var email = $("#email-input").val().trim();
    var team = $("#team-input").val().trim();
    
    // Console log each of the user inputs to confirm we are receiving them
    console.log(name);
    console.log(email);
    console.log(team);

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
