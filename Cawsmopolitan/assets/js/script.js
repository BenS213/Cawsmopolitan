var input = document.getElementById('textInput')
console.log(input.value)

var name = 'bloody mary'
fetch('https://api.api-ninjas.com/v1/cocktail?name=' + name, {
  method: "GET",
  headers: {'X-Api-Key': 'HtXIp1p3atsapFJkv5dL1w==GOFJZZ20Hi4ZxrKQ'},
  contentType: 'application/json',
})
.then(response => response.json())
.then(json => console.log(json));



fetch('https://api.unsplash.com/search/photos?per_page=1&query=' + name + '&client_id=kaRL9t2LFHObSdjRab4aJuRJw5iCXYWC76-ReD7Hfuo', {
  method: "GET",
  headers: {'Accept-Version': 'v1'},
  contentType: 'application/json',
})
.then(response => response.json())
.then(function (json) {
  console.log(json);
  var image = json.results[0].urls.regular;
  $('#cocktailImg').attr('src', image);
});