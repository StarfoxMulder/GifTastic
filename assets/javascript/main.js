$(document).ready(function() {

	$('button').on('click', function() {
        var cryptid = $(this).data('cryptid');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cryptid + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                console.log(queryURL);
                console.log(response)

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    /* step 3: 
                        * uncomment the for loop above and the closing curly bracket below
                        * make a div and reference it in a variable named animalDiv
                        * make a paragraph tag and put it in a variable named p
                            * set the text of the paragraph to the rating of the image in results[i]
                        * make an image and reference it in a variable named animalImage
                        * set the image's src to results[i]'s fixed_height.url 

                        * append the p variable to the animalDiv variable
                        * append the animalImage variable to the animalDiv variable

                        * prepend the animalDiv variable to the element with an id of gifsAppearHere

                    */

                    //------------put step 3 in between these dashes--------------------
                    var cryptidDiv = $('<div>');

                    var p = $('<p>').text("Rating: " + results[i].rating);

                    var cryptidImage = $('<img>');
                    cryptidImage.attr('src', results[i].images.fixed_height.url);

                    cryptidDiv.append(p);
                    cryptidDiv.append(cryptidImage);

                    $('#gifContainer').append(cryptidDiv);
                }

            });
    });

    var topics = [
    	sashquatch,
    	yeti,
    	chupacabra,
    	greys,
    	mothman,
    ];

    for(var i =0; i < topics.length; i++) {

    }
