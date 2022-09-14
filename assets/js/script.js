var searchBtn = document.querySelector('#searchBtn');
var cocktailListEl = document.querySelector('.cocktailList');

function getCocktailData(input) {

  var removeSpaces = input.replaceAll(" ", "");
  if (localStorage.getItem(removeSpaces) == null) {
    localStorage.setItem(removeSpaces, input);
    var pastSearches = $("#pastSearches");
    pastSearches.append(
      `<button class=\"pastSearchBtn\" id=${input}>` + input + `</button>`
    );
  }
  // Cocktail Recipe Api
  fetch('https://api.api-ninjas.com/v1/cocktail?name=' + input, {
  method: "GET",
  headers: {'X-Api-Key': 'HtXIp1p3atsapFJkv5dL1w==GOFJZZ20Hi4ZxrKQ'},
  contentType: 'application/json',
  }).then(response => response.json()).then(json => {
    let obj = json;
    console.log(obj);

    if(obj.length === 0) {
      console.log('error')
      localStorage.removeItem(input)
      var itemToRemove = document.getElementById(input);
      itemToRemove.remove()
      var modal = document.querySelector('.modal');
      modal.classList.remove('noDisplay')
       }

      // loops through the data and adds the code below for each cocktail
    for(let i = 0; i < obj.length; i++) {
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
    }
  

    // adds a toggle button to each cocktail to show or hide the cocktail's info
    var btns = document.querySelectorAll('.right');
    var cocktailInfo = document.querySelectorAll('.cocktailInfo');

    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', toggleView);
    }

    cocktailInfo[0].classList.toggle('show')

    getImage(input);
    // reset the input field
    document.getElementById('textInput').value = '';
  })
  
}

function getImage(input) {
  // Unsplash Api
  fetch('https://api.unsplash.com/search/photos?per_page=1&query=' + input + '&orientation=portrait&collections=cocktail&client_id=kaRL9t2LFHObSdjRab4aJuRJw5iCXYWC76-ReD7Hfuo', {
    method: "GET",
    headers: {'Accept-Version': 'v1'},
    contentType: 'application/json',
  })
  .then(response => response.json())
  .then(function (json) {
    var image = json.results[0].urls.regular;
    $('#cocktailImg').attr('src', image);
    $('#cocktailImg').show();
  });
}

function loadValue() {
  var pastSearches = $("#pastSearches");
  console.log(localStorage);
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var drink = localStorage.getItem(key);
    pastSearches.append(
      "<button class=\"pastSearchBtn\">" + drink + "</button>"
    );
  }
}

function toggleView() {
  var cocktailInfo = document.querySelectorAll('.cocktailInfo');
  console.log(cocktailInfo[this.dataset.number])
  cocktailInfo[this.dataset.number].classList.toggle('show')
}

searchBtn.addEventListener("click", function(event) {
  event.preventDefault();
  var textInput = document.getElementById('textInput');
  getCocktailData(textInput.value.trim());
  while (cocktailListEl.firstChild) {
    cocktailListEl.removeChild(cocktailListEl.firstChild);
  }
});

window.onload = function() {
  //localStorage.clear();
  loadValue();
  $('#cocktailImg').hide();
}

$(document).ready(function(){
  $(document).on("click", "button", function() {
    if (this.id != "searchBtn") {
      var removeSpaces = this.innerText.replaceAll(" ", "");
      var cocktailName = localStorage.getItem(removeSpaces);
      console.log(cocktailName);
      if (cocktailName !== null && cocktailName.length > 0) {
        getCocktailData(cocktailName);
        while (cocktailListEl.firstChild) {
          cocktailListEl.removeChild(cocktailListEl.firstChild);
        }
      }
    }
  });
});

function removeModal () {
  var modal = document.querySelector('.modal');
  modal.classList.remove('show')
  location.reload()
}