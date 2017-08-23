# GifTastic

The enclosed repo includes a dynamic web page that populates gifs using the Giphy API.

Requirements:

* Create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
* Your app should take the topics in this array and create buttons in your HTML.
* Try using a loop that appends a button for each string in the array.
* When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
* When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
* Under every gif, display its rating (PG, G, so on) provided by the GIPHY API.
* Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.
