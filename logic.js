jQuery(document).ready(function( $ ) {

  // Menu settings
  $('#menuToggle, .menu-close').on('click', function(){
    $('#menuToggle').toggleClass('active');
    $('body').toggleClass('body-push-toleft');
    $('#theMenu').toggleClass('menu-open');
  });

  $('.smoothscroll').on('click', function(e) {
    e.preventDefault();
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {

        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1500, 'easeInOutExpo');
      }
    }
    $('body').toggleClass('body-push-toleft');
    $('#theMenu').toggleClass('menu-open');
  });
});

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
      var event = $("<a>").attr("href", eventURL).text("Click Here to Buy Tickets for the Next Game")
      $("#ticket-info1").append(event);
      
      $("#ticket-info2").append(response.events[0].venue.name);

      $("#ticket-info3").append(response.events[0].venue.address);

      $("#ticket-info4").append(response.events[0].venue.extended_address);

      var imgURL = response.events[0].performers[0].image;
      var image = $("<img>").attr("src", imgURL);
      $("#ticket-info5").append(image);

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

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(['jquery'], function ($) {
			return factory($);
		});
	} else if (typeof module === "object" && typeof module.exports === "object") {
		exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
})(function($){

// Preserve the original jQuery "swing" easing as "jswing"
if (typeof $.easing !== 'undefined') {
	$.easing['jswing'] = $.easing['swing'];
}

var pow = Math.pow,
	sqrt = Math.sqrt,
	sin = Math.sin,
	cos = Math.cos,
	PI = Math.PI,
	c1 = 1.70158,
	c2 = c1 * 1.525,
	c3 = c1 + 1,
	c4 = ( 2 * PI ) / 3,
	c5 = ( 2 * PI ) / 4.5;

// x is the fraction of animation progress, in the range 0..1
function bounceOut(x) {
	var n1 = 7.5625,
		d1 = 2.75;
	if ( x < 1/d1 ) {
		return n1*x*x;
	} else if ( x < 2/d1 ) {
		return n1*(x-=(1.5/d1))*x + .75;
	} else if ( x < 2.5/d1 ) {
		return n1*(x-=(2.25/d1))*x + .9375;
	} else {
		return n1*(x-=(2.625/d1))*x + .984375;
	}
}

 $.extend( $.easing,
 {
 	def: 'easeOutQuad',
 	swing: function (x) {
 		return $.easing[$.easing.def](x);
 	},
 	easeInQuad: function (x) {
 		return x * x;
 	},
 	easeOutQuad: function (x) {
 		return 1 - ( 1 - x ) * ( 1 - x );
 	},
 	easeInOutQuad: function (x) {
 		return x < 0.5 ?
 			2 * x * x :
 			1 - pow( -2 * x + 2, 2 ) / 2;
 	},
 	easeInCubic: function (x) {
 		return x * x * x;
 	},
 	easeOutCubic: function (x) {
 		return 1 - pow( 1 - x, 3 );
 	},
 	easeInOutCubic: function (x) {
 		return x < 0.5 ?
 			4 * x * x * x :
 			1 - pow( -2 * x + 2, 3 ) / 2;
 	},
 	easeInQuart: function (x) {
 		return x * x * x * x;
 	},
 	easeOutQuart: function (x) {
 		return 1 - pow( 1 - x, 4 );
 	},
 	easeInOutQuart: function (x) {
 		return x < 0.5 ?
 			8 * x * x * x * x :
 			1 - pow( -2 * x + 2, 4 ) / 2;
 	},
 	easeInQuint: function (x) {
 		return x * x * x * x * x;
 	},
 	easeOutQuint: function (x) {
 		return 1 - pow( 1 - x, 5 );
 	},
 	easeInOutQuint: function (x) {
 		return x < 0.5 ?
 			16 * x * x * x * x * x :
 			1 - pow( -2 * x + 2, 5 ) / 2;
 	},
 	easeInSine: function (x) {
 		return 1 - cos( x * PI/2 );
 	},
 	easeOutSine: function (x) {
 		return sin( x * PI/2 );
 	},
 	easeInOutSine: function (x) {
 		return -( cos( PI * x ) - 1 ) / 2;
 	},
 	easeInExpo: function (x) {
 		return x === 0 ? 0 : pow( 2, 10 * x - 10 );
 	},
 	easeOutExpo: function (x) {
 		return x === 1 ? 1 : 1 - pow( 2, -10 * x );
 	},
 	easeInOutExpo: function (x) {
 		return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
 			pow( 2, 20 * x - 10 ) / 2 :
 			( 2 - pow( 2, -20 * x + 10 ) ) / 2;
 	},
 	easeInCirc: function (x) {
 		return 1 - sqrt( 1 - pow( x, 2 ) );
 	},
 	easeOutCirc: function (x) {
 		return sqrt( 1 - pow( x - 1, 2 ) );
 	},
 	easeInOutCirc: function (x) {
 		return x < 0.5 ?
 			( 1 - sqrt( 1 - pow( 2 * x, 2 ) ) ) / 2 :
 			( sqrt( 1 - pow( -2 * x + 2, 2 ) ) + 1 ) / 2;
 	},
 	easeInElastic: function (x) {
 		return x === 0 ? 0 : x === 1 ? 1 :
 			-pow( 2, 10 * x - 10 ) * sin( ( x * 10 - 10.75 ) * c4 );
 	},
 	easeOutElastic: function (x) {
 		return x === 0 ? 0 : x === 1 ? 1 :
 			pow( 2, -10 * x ) * sin( ( x * 10 - 0.75 ) * c4 ) + 1;
 	},
 	easeInOutElastic: function (x) {
 		return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
 			-( pow( 2, 20 * x - 10 ) * sin( ( 20 * x - 11.125 ) * c5 )) / 2 :
 			pow( 2, -20 * x + 10 ) * sin( ( 20 * x - 11.125 ) * c5 ) / 2 + 1;
 	},
 	easeInBack: function (x) {
 		return c3 * x * x * x - c1 * x * x;
 	},
 	easeOutBack: function (x) {
 		return 1 + c3 * pow( x - 1, 3 ) + c1 * pow( x - 1, 2 );
 	},
 	easeInOutBack: function (x) {
 		return x < 0.5 ?
 			( pow( 2 * x, 2 ) * ( ( c2 + 1 ) * 2 * x - c2 ) ) / 2 :
 			( pow( 2 * x - 2, 2 ) *( ( c2 + 1 ) * ( x * 2 - 2 ) + c2 ) + 2 ) / 2;
 	},
 	easeInBounce: function (x) {
 		return 1 - bounceOut( 1 - x );
 	},
 	easeOutBounce: bounceOut,
 	easeInOutBounce: function (x) {
 		return x < 0.5 ?
 			( 1 - bounceOut( 1 - 2 * x ) ) / 2 :
 			( 1 + bounceOut( 2 * x - 1 ) ) / 2;
 	}
 });

 });

 //search bar onFocus and onBlur animations
 $(function () {
	var searchField = $("#query");
	var icon = $("#search-btn");
	$("#search-form").submit(function (event) {
			event.preventDefault();
	});
	//focus event
	searchField.on("focus", function () {
			$(this).animate({
					width: "100%"
			}, 400);
			icon.animate({
					right: "10px"
			}, 400);
	});
	//blur event
	searchField.on("blur", function () {
			if (searchField.val() == "") {
					searchField.animate({
							width: "45%"
					}, 400);
					icon.animate({
							right: "360px"
					}, 400);
			}
	});
});
//search bar "search" functionality
function search() {
	//clear prev form results
	$("#results").html("");
	$("#buttons").html("");
	//get input from form
	var q = $("#query").val();
	//run "GET" request for the Youtube API
	$.get(
			"https://www.googleapis.com/youtube/v3/search", {
					part: "snippet, id",
					q: q,
					type: "video",
					key: "AIzaSyAcXtwKJ7xtmb2E2tPUE46GuvDzx0ygses"
			},
			function (data) {
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					//log data
					console.log(data);
					$.each(data.items, function (i, item) {
							//get output
							var output = getOutput(item);
							//display results
							$("#results").append(output);
					});
					var buttons = getButtons(prevPageToken, nextPageToken);
					//display buttons
					$("#buttons").append(buttons);
			}
	);
}
//prev page function
function prevPage() {
	var token = $("#prev-button").data("token");
	var q = $("#prev-button").data("query");
	//clear prev form results
	$("#results").html("");
	$("#buttons").html("");
	//run "GET" request for the Youtube API
	$.get(
			"https://www.googleapis.com/youtube/v3/search", {
					part: "snippet, id",
					q: q,
					type: "video",
					pageToken: token,
					key: "AIzaSyAcXtwKJ7xtmb2E2tPUE46GuvDzx0ygses"
			},
			function (data) {
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					//log data
					console.log(data);
					$.each(data.items, function (i, item) {
							//get output
							var output = getOutput(item);
							//display results
							$("#results").append(output);
					});
					var buttons = getButtons(prevPageToken, nextPageToken);
					//display buttons
					$("#buttons").append(buttons);
			}
	);
}
//next page function
function nextPage() {
	var token = $("#next-button").data("token");
	var q = $("#next-button").data("query");
	//clear prev form results
	$("#results").html("");
	$("#buttons").html("");
	//run "GET" request for the Youtube API
	$.get(
			"https://www.googleapis.com/youtube/v3/search", {
					part: "snippet, id",
					q: q,
					type: "video",
					pageToken: token,
					key: "AIzaSyBvL9FytrqumUi2IT6cktcJs2bTbm621wU  "
			},
			function (data) {
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					//log data
					console.log(data);
					$.each(data.items, function (i, item) {
							//get output
							var output = getOutput(item);
							//display results
							$("#results").append(output);
					});
					var buttons = getButtons(prevPageToken, nextPageToken);
					//display buttons
					$("#buttons").append(buttons);
			}
	);
}
//build output
function getOutput(item) {
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;
	//output string variable
	var output = "<li>" + "<div class='list-left'>" + "<img src='" + thumb + "'>" + "</div>" + "<div class='list-right'>" + "<h3 class='vTitle'><a class='fancybox fancybox.iframe' href='http://www.youtube.com/embed/" + videoId + "'>" + title + "</a></h3>" + "<small>By <span class='cTitle'>" + channelTitle + "</span> on " + videoDate + "</small>" + "<p>" + description + "</p>" + "</div>" + "</li>" + "<div class='clearBoth'></div>" + "";
	return output;
}
//build buttons
// function getButtons(prevPageToken, nextPageToken) {
// 	var q = $("#query").val();
// 	if (!prevPageToken) {
// 			var btnoutput = "<div class='button-container'>" +
// 					"<button id='next-button' class='page-button' data-token='" + nextPageToken + "' data-query='" + q + "' onclick='nextPage();'>Next Page</button></div>";
// 	} else {
// 			var btnoutput = "<div class='button-container'>" +
// 					"<button id='prev-button' class='page-button' data-token='" + prevPageToken + "' data-query='" + q + "' onclick='prevPage();'>Prev Page</button>" +
// 					"<button id='next-button' class='page-button' data-token='" + nextPageToken + "' data-query='" + q + "' onclick='nextPage();'>Next Page</button></div>";
// 	}
// 	return btnoutput;
// }