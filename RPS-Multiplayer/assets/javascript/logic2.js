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
var userStorage = localStorage;

var config = {
				    apiKey: "AIzaSyC2Fnkvac447UrXn-1kA17rY010H-qrgMI",
				    authDomain: "rpsmultiplayer-9f928.firebaseapp.com",
				    databaseURL: "https://rpsmultiplayer-9f928.firebaseio.com",
				    storageBucket: "rpsmultiplayer-9f928.appspot.com",
				  };
				  firebase.initializeApp(config)

				var database = firebase.database();

database.ref().on("value", function(snapshot) {
	console.log(snapshot.val());

	if (snapshot.child("player1Name").val() == null) {
		localStorage.setItem('playerId', "player 1");

	}   else if (snapshot.child("player2Name").val() == null && snapshot.child("player1Name").exists()) {
		localStorage.setItem('playerId', "player 2");
	}

	ref.orderByChild("posts").on("child_added", function(snapshot) {
		for(var i = 0; i < snapshot.child("posts").length; i++) {
			newPostDiv = "<div class='row><div class='col-xs-3'>"+snapshot.child("posts")[i].author+"</div><div class='col-xs-9'>"+snapshot.child("posts")[i].content+"</div></div>";
			$('#chatTargetDiv').prepend(newPostDiv);
		}
	})



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
					if (localStorage.playerId == "player 1") {
						var player1Guess = String.fromCharCode(event.keyCode).toLowerCase();
					} else if (localStorage.playerId == "player 2") {
						var player2Guess = String.fromCharCode(event.keyCode).toLowerCase();
					}

						if (player1Guess == 'r' && player2Guess == 'r') {
						    playerDraws++;
						}
						else if (player1Guess == 'r' && player2Guess == 'p') {
						    player2TotalWins += 1;
						    player1TotalLoses += 1;
						}
						else if (player1Guess == 'r' && player2Guess == 's') {
						    player1TotalWins += 1;
						    player2TotalLoses += 1;
						}

						else if (player1Guess == 'p' && player2Guess == 'p') {
						    playerDraws += 1;
						}
						else if (player1Guess == 'p' && player2Guess == 's') {
						    player2TotalWins += 1;
						    player1TotalLoses += 1;
						}
						else if (player1Guess == 'p' && player2Guess == 'r') {
						    player1TotalWins += 1;
						    player2TotalLoses += 1;
						}

						else if (player1Guess == 's' && player2Guess == 's') {
						    playerDraws += 1;
						}
						else if (player1Guess == 's' && player2Guess == 'p') {
						    player2TotalWins += 1;
						    player1TotalLoses += 1;
						}
						else if (player1Guess == 's' && player2Guess == 'r') {
						    player1TotalWins += 1;
						    player2TotalLoses += 1;
						}

					$('#player1TotalWins').html(player1TotalWins);
					$('#player2TotalWins').html(player2TotalWins);
					$('#player1TotalLoses').html(player1TotalLoses);
					$('#player2TotalLoses').html(player2TotalLoses);
					$('.playerDraws').html(playerDraws);


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
	})

	$('#chatSubmit').click(function() {
		posterId = localStorage.getItem('playerId');
		if (posterId == player1Name) {
			posterName = player1Name;

		} else if (posterId == player2Name) {
			posterName = player2Name;
		}

		var latestChat = $('#chatInput').val();

		var postsRef = ref.child("posts");
		var newPostRef = postsRef.push();
		    newPostRef.set({
		    	author: "'"+posterName+"'",
		    	content: "'"+latestChat+"'"
		  });
	})
})//End firebase snapshot evaluation
});