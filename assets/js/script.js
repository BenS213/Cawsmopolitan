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
