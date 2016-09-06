$(document).ready(function(){

// Create an array that lists out all of the options
var options = ['r','p','s'];
var players = 0;
var playerId = ""; //Can be set to either "Player 1" or "Player 2"
var player1Name = "";
var player2Name = "";
var player1TotalWins = 0;
var player2TotalWins = 0;
var player1TotalLoses = 0;
var player2TotalLoses = 0;
var playerDraws = 0;
var player1Guess = "";
var player2Guess = "";

var config = {
				    apiKey: "AIzaSyC2Fnkvac447UrXn-1kA17rY010H-qrgMI",
				    authDomain: "rpsmultiplayer-9f928.firebaseapp.com",
				    databaseURL: "https://rpsmultiplayer-9f928.firebaseio.com",
				    storageBucket: "rpsmultiplayer-9f928.appspot.com",
				  };
				  firebase.initializeApp(config)

				var database = firebase.database();

database.ref().on("value", function(snapshot) {
	if (snapshot.child("player1Name").val() == null) {
		localStorage.setItem('playerId', "player 1");

	}

	else if (snapshot.child("player2Name").val() == null && snapshot.child("player1Name").exists()) {
		localStorage.setItem('playerId', "player 2");
	}

	// If Firebase has a highPrice and highBidder stored (first case)
	else if (snapshot.child("player1Name").exists() && snapshot.child("player2Name").exists()) {

	}

	else {

	}


	getUserNames();
//To control for only two users at a time, I'm requesting players to 
//	initiate play and assign themselves a Player Name
	function getUserNames() {
		if (player1Name || player2Name == "" && players <= '2') {
			console.log("player1Name and player2Name blank check is working");
			$('#preGameDiv').removeClass('hide');
			$('#preGameDiv').addClass('show');
			$('#liveGameDiv').removeClass('show');
			$('#liveGameDiv').addClass('hide');

			$('#playerNameSubmit').click(function() {
				console.log("submit click is working");
				var nameTest = $("#nameInput").val().trim();

				if (nameTest.length == '0') {
					console.log("length check 'IF' is working and the length is "+document.getElementById("nameInput").value.length+"");
					$("#errorMsg").removeClass('hide');
					$("#errorMsg").addClass('show');
					$('#nameInput').val("");
				} else {
					console.log("length check 'ELSE' is working and the length is "+document.getElementById("nameInput").value.length+"");
					$("#errorMsg").removeClass('show');
					$("#errorMsg").addClass('hide');
					$('#nameInput').val("");
				}

				if (player1Name == "") {
					console.log("player1Name value check is working");
					player1Name = nameTest;
					$('#nameInput').val("");
					console.log(player1Name);
					players++;
					database.child('player1Name').set(player1Name);
	    			database.child('players').set(players);
				} else if (player2Name == ""){
					console.log("player2Name value check is working");
					player2Name = nameTest;
					$('#nameInput').val("");
					console.log(player2Name);
					players++;
					console.log(players);
					database.child('player2Name').set(player2Name);
	    			database.child('players').set(players);
					$('#startPrompt').text('CLICK START TO BEGIN')
					$('#nameInput').addClass('hide');
					$('#errorMsg').addClass('hide');
					$('#playerNameSubmit').addClass('hide');
					$('#playerStart').removeClass('hide');
					$('#playerStart').addClass('show');
				}
			}); //End player name submit
		}//End player name get conditional

/*		if (players == '2') {
			console.log("Does this trigger if players == exactly 2");
			$('#nameInput').addClass('hide');
			$('#errorMsg').addClass('hide');
			$('#playerNameSubmit').addClass('hide');
			$('#playerStart').removeClass('hide');
			$('#playerStart').addClass('show');
		}
*/


	}; //End getUserNames

	$('#playerStart').click(function() {
		if(player1Name && player2Name !== "") {
			$('#preGameDiv').removeClass('show');
			$('#preGameDiv').addClass('hide');
			$('#liveGameDiv').removeClass('hide');
			$('#liveGameDiv').addClass('show');

			function gamePlay() {

			// Captures Key Clicks
				document.onkeyup = function(event) {

					// Determines which exact key was selected. Make it lowercase
					var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

					// Create code to randomly choose one of the three options (Computer) 
					var computerGuess = options[Math.floor(Math.random()*options.length)];

						if (userGuess == 'r' && computerGuess == 'r') {
						    draws++;
						}
						else if (userGuess == 'r' && computerGuess == 'p') {
						    compTotal += 1;
						}
						else if (userGuess == 'r' && computerGuess == 's') {
						    userTotal += 1;
						}

						else if (userGuess == 'p' && computerGuess == 'p') {
						    draws += 1;
						}
						else if (userGuess == 'p' && computerGuess == 's') {
						    compTotal += 1;
						}
						else if (userGuess == 'p' && computerGuess == 'r') {
						    userTotal += 1;
						}

						else if (userGuess == 's' && computerGuess == 's') {
						    draws += 1;
						}
						else if (userGuess == 's' && computerGuess == 'p') {
						    compTotal += 1;
						}
						else if (userGuess == 's' && computerGuess == 'r') {
						    userTotal += 1;
						}

					var html = "<p>Press r, p, or s to start playing</p>" +
						"<p>Wins: "+userTotal+"</p>"
						+
						"<p>Loses: "+compTotal+"</p>"
						+
						"<p>Draws: "+draws+"</p>";

					// Placing the html 
					document.querySelector('#game').innerHTML = html;

				}; //End keystroke event listener
			}; //End gamePlay function
		}; //End conditional for gamePlay
	}); //End submit click function


	$('#quitButton').click(function() {
		window.location.reload();
		players = 0;
		player1Name = "";
		player2Name = "";
		player1TotalWins = 0;
		player2TotalWins = 0;
		player1TotalLoses = 0;
		player2TotalLoses = 0;
		playerDraws = 0;
		player1Guess = "";
		player2Guess = "";
		//Reset values in FireBase
		database.child('players').remove();
	    database.child('player1Name').remove();
	    database.child('player2Name').remove();
	    database.child('player1TotalWins').remove();
	    database.child('player2TotalWins').remove();
	    database.child('player1TotalLoses').remove();
	    database.child('player2TotalLoses').remove();
	    database.child('playerDraws').remove();
	    database.child('player1Guess').remove();
	    database.child('player2Guess').remove();
	}

	$('#chatSubmit').click(function() {
		var latestChat = $('#chatInput').val();

		var postsRef = ref.child("posts");
		var newPostRef = postsRef.push();
		    newPostRef.set({
		    	author: "'"++"'",
		    	title: "'"+latestChat+"'"
		  });
	})
}//End firebase snapshot evaluation
});