$(document).ready(function () {
  renderButtons();
  
});

// Variables to store the Data
var pokemonArr = ['Charmander', 'Ditto', 'Pikachu'];

// Function for displaying Pokemon data
function renderButtons() {

  // Deleting the Pokemon buttons prior to adding new Pokemon buttons
  $("#pokemon-btns").empty();

  // Looping through the array of movies
  for (var i = 0; i < pokemonArr.length; i++) {

    // Then dynamicaly generating buttons for each Pokemon in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var b = $("<button>");
    // Adding b class
    b.addClass("btn btn-primary gifBtn");
    // Adding b data-attribute with b value of the Pokemon at index i
    b.attr("data-pokemon", pokemonArr[i]);
    // Providing the button's text with b value of the Pokemon at index i
    b.text(pokemonArr[i]);
    // Adding the button to the HTML
    $("#pokemon-btns").append(b);
  }
}

$('#add-poke').on('click', function(event) {
  event.preventDefault();

  var pokemonVal = $('#pokemon-input').val().trim();

  pokemonArr.push(pokemonVal);

  renderButtons();
})

var clickedBtn = function () {
  var pokemon = $(this).attr("data-pokemon");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    pokemon + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var results = response.data;  
    console.log(results)

    $("#pokemon-gifs").empty();

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $('<div class="gifyImgs">');
      console.log(results[i]);
      var rating = results[i].rating;

      var p = $('<p>').text("Rating: " + rating);

      var pokemonGifUrl = $('<img>');
      pokemonGifUrl.attr('src', results[i].images.fixed_height.url);

      gifDiv.prepend(p);
      gifDiv.prepend(pokemonGifUrl);

      $("#pokemon-gifs").prepend(gifDiv);
    }
  })
}

$(document).on('click', '.gifBtn', clickedBtn);