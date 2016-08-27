$(document).ready(function() {

	$('.btn-secondary').click(function() {
		console.log("anything?");
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
                    cryptidImage.attr('src', results[i].images.fixed_height.url);

                    cryptidDiv.append(h2);
                    cryptidDiv.append(cryptidImage);

                    $('#gifContainer').append(cryptidDiv);

                    topics.push(cryptid);
                }

            })
    });

    var topics = [
    	'sashquatch',
    	'yeti',
    	'chupacabra',
    	'greys',
    	'mothman',
    ];

    for(var i =0; i < topics.length; i++) {
    	var but = "<button type='button' class='btn btn-secondary' data-cryptid='"+topics[i]+"'>"+topics[i]+"</button>";
    	$('#gifButtons').append(but);
    };
});