$(document).ready(function() {
	var topics = [
    	'sasquatch',
    	'yeti',
    	'chupacabra',
    	'greys',
    	'mothman'
    ];

	popCrypButtons();

	$('.btn-primary').click(function() {
		var newCryptid = $('#search').val().trim();
		console.log(topics);
		topics.push(newCryptid);
		console.log(topics);
		popCrypButtons();
	});

	$('body').on('click', '.btn-secondary', function() {
//	$('.btn-secondary').click(function() {
			console.log("anything?");

			$('#gifContainer').empty();
	        var cryptid = $(this).data('cryptid');
	        console.log(cryptid);
	        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cryptid + "&api_key=dc6zaTOxFJmzC&limit=10";

	        $.ajax({
	                url: queryURL,
	                method: 'GET'
	            })
	            .done(function(response) {
	                console.log(queryURL);
	                console.log(response);

	                var results = response.data;

	                for (var i = 0; i < results.length; i++) {

	                    var cryptidDiv = $('<div>');

	                    var h2 = $('<h2>').text("Rating: " + results[i].rating);

	                    var cryptidImage = $('<img>');
	                    cryptidImage.attr('src', results[i].images.original_still.url);
	                    cryptidImage.attr('data-state', 'still');
	                    cryptidImage.attr('data-animate', results[i].images.original.url);
	                    cryptidImage.attr('data-still', results[i].images.original_still.url);
	                    cryptidImage.attr('class', 'cryptidImg');

	                    cryptidDiv.append(h2);
	                    cryptidDiv.append(cryptidImage);

	                    $('#gifContainer').append(cryptidDiv);

	                }
         	   }) //end AJAX
    });//end secondary btn click

    function popCrypButtons() {
    	$('#gifButtons').empty();

	    for(var i =0; i < topics.length; i++) {
	    	var but = "<button type='button' class='btn btn-secondary' data-cryptid='"+topics[i]+"'>"+topics[i]+"</button>";
	    	$('#gifButtons').append(but);
	    };

	    console.log(topics);
	};

	
	$('body').on('click', 'img', function(){
		var state = $(this).attr('data-state');
		console.log(state);

		if (state == 'still') {
			$(this).attr('data-state', 'playing');
			$(this).attr('src', $(this).attr('data-animate'));
		}
		else if (state != 'still') {
			console.log('bloop?');
			$(this).attr('data-state', 'still');
			$(this).attr('src', $(this).attr('data-still'));
		}
	}); //end img click handler

});//end doc on load

