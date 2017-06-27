// Script to run after HTML
$( document ).ready(function() {

// Array of initial Gifs
var feelings = ["Happy", "Sad", "Goofy", "Angry", "Pensive", "Sick", "Hungry", "Excited", "Scared", "Silly"];

// Function to display Gifs
function displayGifButtons(){
    $("#gifBtn").empty(); 
    for (var i = 0; i < feelings.length; i++){
        var gifBtns = $("<button>");
        gifBtns.addClass("feeling");
        gifBtns.addClass("btn btn-primary")
        gifBtns.attr("data-name", feelings[i]);
        gifBtns.text(feelings[i]);
        $("#gifBtn").append(gifBtns);
    }
}

// Function to add New Gifs
function addNewGif(){
    $("#addGif").on("click", function(){
    var feeling = $("#action-input").val().trim();
    if (feeling == ""){
      return false; 
    }
    feelings.push(feeling);

    displayGifButtons();
    return false;
    });
}

// Function to remove last Gif
function removeLastGif(){
    $("removeGif").on("click", function(){
    feelings.pop(feeling);
    displayGifButtons();
    return false;
    });
}

// Display Gifs with limit of 10 using the Giphy API
function displayGifs(){
    var feeling = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + feeling + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty(); 
        var results = response.data;
        if (results == ""){
          alert("There aren't any Gifs for this feeling");
        }
        for (var i=0; i<results.length; i++){

// Variables to add Rating and activity to initially show still, move when clicked then stop again when clicked
            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
        
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
          
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
 
            $("#gifsView").prepend(gifDiv);
        }
    });
}

// Run functions
displayGifButtons(); 
addNewGif();
removeLastGif();

$(document).on("click", ".feeling", displayGifs);
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