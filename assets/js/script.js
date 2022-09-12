var cocktailListEl = document.querySelector('.cocktailList');


 function getCocktailData() {

  var input = document.getElementById('textInput');

  // Cocktail Recipe Api
  fetch('https://api.api-ninjas.com/v1/cocktail?name=' + input.value, {
  method: "GET",
  headers: {'X-Api-Key': 'HtXIp1p3atsapFJkv5dL1w==GOFJZZ20Hi4ZxrKQ'},
  contentType: 'application/json',
})
.then(response => response.json())
.then(json => {
  
  let obj = json;
  

  // loops through the data and adds the code below for each cocktail
 for(i = 0; i < obj.length; i++) {
    var currentCocktail = obj[i]
    
    var ingredientsList = currentCocktail.ingredients.join(' <br> ')
    var cocktail = document.createElement('li')
    cocktail.innerHTML = `
    <li class="cocktail">
      <h2 class="cocktailName">${currentCocktail.name}<button data-number='${[i]}'class="right"><i class="fa-solid fa-angle-down"></i></button></h2>
      <!-- Ingredients -->
      <div data-number='${[i]}' class="cocktailInfo ">           
        <h2 class="ingredients text-2xl pb-6">Ingredients List:</h2>
        <ul class="ingredientsList text-xl">
        ${ingredientsList}
        </ul>
      <!-- Instructions -->
      <div class="instructions">
    <h2 class="text-2xl py-5">Instructions:</h2>
      <p class="recipe">${currentCocktail.instructions}</p>
    </div>
  </div> 
 </li>`;
 cocktailListEl.appendChild(cocktail)
 
 // This part is not working yet

  }

// adds a toggle button to each cocktail to show or hide the coctail's info
var btns = document.querySelectorAll('.right');
var cocktailInfo = document.querySelectorAll('.cocktailInfo');

for (i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', toggleView);
}

function toggleView() {
  console.log(cocktailInfo[this.dataset.number])
  cocktailInfo[this.dataset.number].classList.toggle('show')

}


})


  // Cocktail Image Api
fetch('https://api.unsplash.com/search/photos?per_page=1&query=' + input.value + '&client_id=kaRL9t2LFHObSdjRab4aJuRJw5iCXYWC76-ReD7Hfuo', {
  method: "GET",
  headers: {'Accept-Version': 'v1'},
  contentType: 'application/json',
})
.then(response => response.json())
.then(function (json) {
  var image = json.results[0].urls.regular;
  $('#cocktailImg').attr('src', image);
});
  

// reset the input field
input.value = ''
}

