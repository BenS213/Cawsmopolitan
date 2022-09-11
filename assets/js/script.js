

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
  
  console.log(json);
  let obj = json;
  

  // loops through the data and adds the code below for each cocktail
 for(i = 0; i < obj.length; i++) {
    var cocktailListEl = document.querySelector('.cocktailList');
    var currentCocktail = obj[i]
    var ingredientsList = currentCocktail.ingredients.join(' <br> ')
    var cocktail = document.createElement('li')
    cocktail.innerHTML = `<h2 class="cocktailName">${currentCocktail.name}<button class="right" onclick=""><i class="fa-solid fa-angle-down"></i></button></h2>
    <!-- Ingredients -->
     <div class="cocktailInfo">           
       <h2 class="ingredients text-2xl pb-6">Ingredients List:</h2>
       <ul class="ingredientsList text-xl">
       ${ingredientsList}
       </ul>
    <!-- Instructions -->
    <div class="instructions">
   <h2 class="text-2xl py-5">Instructions:</h2>
    <p class="recipe">${currentCocktail.instructions}</p>
   </div>
 </div> `;
 cocktailListEl.appendChild(cocktail)
 


 // This part is not working yet
var toggleBtn = document.querySelector('.right')
var cocktailInfoEl = document.querySelector('.cocktailInfo')
toggleBtn.addEventListener('click', function() {
cocktailInfoEl.classList.toggle('noDisplay')
})
  }

})

//Get Local Storge Info TESTING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function getInfo() {
  var currentList =localStorage.getItem("cocktail");
  if (currentList !== null ){
      freshList = JSON.parse(currentList);
      return freshList;
  } else {
      freshList = [];
  }
  return freshList;
}

//Add Local Info to Local Storage TESTING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function addInfo (n) {
  var addedList = getInfo();

  if (historyList.includes(currentCocktail) === false){
      addedList.push(n);
  }
 
  localStorage.setItem("cocktail"); JSON.stringify(addedList));
};


//Display History TESTING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function renderInfo () {
  var historyList = getInfo();
  for (var i = 0; i < historyList.length; i++) {
      var inputCity = historyList[i];
      var searchCity =$("<div>") 
      textInput.attr('id',textInput) 
      textInput.text(textInput) 
      textInput.addClass("h4")

      $(".history").append(textInput)
  }
};



  // Cocktail Image Api
fetch('https://api.unsplash.com/search/photos?per_page=1&query=' + input.value + '&client_id=kaRL9t2LFHObSdjRab4aJuRJw5iCXYWC76-ReD7Hfuo', {
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
  

// reset the input field
input.value = ''
}