// Document ready to run after HTML is done
$( document ).ready(function() {

// Array of strings for Gifs;
var feelings = ["Crazy", "Sad", "Hyper", "Lazy", "Mad", "Happy", "Surprised", "Joy", "Angry", "Afraid","Hungry", "Excited", "Sick"];

// Function to displays gif buttons. 
function displayGif(){

    // Clear (empty) initially
    $("#gifButton").empty(); 
    for (var i = 0; i < feelings.length; i++){
        var gifBtn = $("<button>");
        gifBtn.addClass("feels");
        gifBtn.addClass("btn btn-primary")
        gifBtn.attr("data-name", feelings[i]);
        gifBtn.text(feelings[i]);
        $("#gifButton").append(gifBtn);
    }
}
// Function to add a new Gif
function addNewGif(){
    $("#addGif").on("click", function(){
    var feels = $("#feeling-input").val().trim();
    if ( feels == ""){
      return false; 
    }
    feelings.push(feels);

    displayGif();
    return false;
    });
}

// Function to remove last Gif
function removeGifBtn(){
    $("#removeGif").on("click", function(){
    feelings.pop(feels);
    displayGif();
    return false;
    });
}
// Function that displays all gifs; use API URL with api key
function displayGifs(){
    var feels = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + feelings + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {

// Console log to make sure they appear; set alert for items with no gifs in database
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("There aren't any gifs for this selected button");
        }
        for (var i=0; i<results.length; i++){

// Add div for Gifs and add corresponding Ratings from API
        var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");

        var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);

        var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            $("#gifsView").prepend(gifDiv);
        }
    });
}

// Call functions above 
displayGif(); 
addNewGif();
removeGifBtn();


//Event Listeners
$(document).on("click", ".feels", displayGif);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});