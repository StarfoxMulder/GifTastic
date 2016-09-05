$(document).ready(function(){

// Create an array that lists out all of the options
var options = ['r','p','s'];
var player1Name = "";
var player2Name = "";
var player1TotalWins = 0;
var player2TotalWins = 0;
var player1TotalLoses = 0;
var player2TotalLoses = 0;
var playerDraws = 0;
var player1Guess = "";
var player2Guess = "";

	getUserNames();
	gamePlay();

//To control for only two users at a time, I'm requesting players to 
//	initiate play and assign themselves a Player Name
	function getUserNames() {
		if (player1Name || player2Name == "") {
			console.log("player1Name and player2Name blank check is working");
			document.getElementById("preGameDiv").classList.add('show');
			document.getElementById("liveGameDiv").classList.add('hide');

			$('#playerNameSubmit').click(function() {
				console.log("submit click is working");

				if (document.getElementById("nameInput").value.length < '1') {
					console.log("length check is working");
					document.getElementById("errorMsg").innerHTML("<p>NAMES MUST BE AT LEAST ONE CHARACTER LONG</p>");
				}

				if (player1Name == "") {
					console.log("player1Name value check is working");
					player1Name = document.getElementById("nameInput").value;
				} else {
					console.log("player2Name value check is working");
					player2Name = document.getElementById("nameInput").value;
				}
			});


		}
	};

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

		};
	};

});