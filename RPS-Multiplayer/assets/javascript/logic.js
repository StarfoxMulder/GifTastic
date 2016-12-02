$(document).ready(function(){

// Create an array that lists out all of the options
var options = ['r','p','s'];
var players = 0;
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
				} else if (player2Name == ""){
					console.log("player2Name value check is working");
					player2Name = nameTest;
					$('#nameInput').val("");
					console.log(player2Name);
					players++;
					console.log(players);
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

				var config = {
				    apiKey: "AIzaSyC2Fnkvac447UrXn-1kA17rY010H-qrgMI",
				    authDomain: "rpsmultiplayer-9f928.firebaseapp.com",
				    databaseURL: "https://rpsmultiplayer-9f928.firebaseio.com",
				    storageBucket: "rpsmultiplayer-9f928.appspot.com",
				  };
				  firebase.initializeApp(config)

				var database = firebase.database();

			// Captures Key Clicks
				document.onkeyup = function(event) {

					

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
	})

});