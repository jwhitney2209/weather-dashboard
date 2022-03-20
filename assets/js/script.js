// variable declarations
var userInputEl = document.querySelector("#input-form");
var submitButtonEl = document.querySelector("#search-btn");
var thisIsCityEl = document.querySelector("#cityname");
var displayCityEl = document.querySelector("#display-city");
var weatherContainerEl = document.querySelector("#weather-container");
var recentSearchEl = document.querySelector("#recent-searches");
var forecastBoxesEl = document.querySelector("#forecast-boxes")

// counter to add ID's to each city name for local storage
var searchIdCounter = 0;

// apiKey for OpenWeather
var apiKey = "edb9f78900c4573920e4c01ff60162d2";

// form submission handler, will take city name and run functions
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get city name from form
  var cityname = thisIsCityEl.value.trim();
  if (cityname) {
    getCoordinates(cityname)
    displaySearches(cityname)
    saveSearch(cityname)
    thisIsCityEl.textContent = "";
  } else {
    displayCityEl.textContent = "Error: City Not Found";
  }
}
// this function calls the Geocoding API
function getCoordinates(city) {
  $.ajax({
    type:"GET",
    url:"https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey,
    async:true,
    dataType: "json",
    success: function(json) {
      getCoordinates.json = json;
      getWeather(json.coord); // this is sending only the coordinate data from the Geocoding API data that we're requesting... to the getWeather function below
      var displayDate = moment(json.dt*1000).format('MM-DD-YYYY');
      var displayCity = json.name;
      displayCityEl.textContent = displayCity + " ("+displayDate+")";
    },
    error: function(err) {
      console.log(err);
    }
  })
}

// this function calls the One Call API 
function getWeather (coord) {
  $.ajax({
    type:"GET",
    url:"https://api.openweathermap.org/data/2.5/onecall?lat="+coord.lat+"&lon="+coord.lon+"&units=imperial&appid="+apiKey,
    async:true,
    dataType: "json",
    success: function(json) {
      getWeather.json = json;

      var current = json.current;
      var uvIndex = Math.round(current.uvi);
      var iconId = current.weather[0].icon;
        $("#display-icon").html("<img src='http://openweathermap.org/img/wn/"+iconId+"@2x.png'>")
        $("#display-temp").text(Math.round(current.temp) + "\xB0" + "F");
        $("#display-wind").text(Math.round(current.wind_speed) + "mph");
        $("#display-hum").text(current.humidity + "%");
        $("#display-uvi").text(uvIndex);
        if (uvIndex <= 2) {
          $("#display-uvi").removeClass().addClass("tag is-success");
        } else if (uvIndex >= 3 || uvIndex <= 5) {
          $("#display-uvi").removeClass().addClass("tag is-warning");
        } else if (uvIndex == 6 || uvIndex == 7) {
          $("#display-uvi").removeClass().addClass("tag is-$orange");
        } else if (uvIndex >= 8 || uvIndex <= 10) {
          $("#display-uvi").removeClass().addClass("tag is-danger");
        } else if (uvIndex >= 11) {
          $("#display-uvi").removeClass().addClass("tag is-$purple");
        };

      displayForecast(json.daily);
    },
    error: function(err) {
      console.log(err);
    }
  })
}

function displayForecast (daily) {

  // convert milliseconds to current date using moment.js
  var dateOne = moment(daily[1].dt*1000).format('MM-DD-YYYY')
  var dateTwo = moment(daily[2].dt*1000).format('MM-DD-YYYY')
  var dateThree = moment(daily[3].dt*1000).format('MM-DD-YYYY')
  var dateFour = moment(daily[4].dt*1000).format('MM-DD-YYYY')
  var dateFive = moment(daily[5].dt*1000).format('MM-DD-YYYY')

  // set dates to each forecast card
  $("#date-1").text(dateOne);
  $("#date-2").text(dateTwo);
  $("#date-3").text(dateThree);
  $("#date-4").text(dateFour);
  $("#date-5").text(dateFive);

  // 
  $("#display-icon1").html("<img src='http://openweathermap.org/img/wn/"+daily[1].weather[0].icon+".png'>");
  $("#display-temp1").text(Math.round(daily[1].temp.day) + "\xB0" + "F");
  $("#display-wind1").text(Math.round(daily[1].wind_speed) + "mph");
  $("#display-hum1").text(daily[1].humidity + "%");

  $("#display-icon2").html("<img src='http://openweathermap.org/img/wn/"+daily[2].weather[0].icon+".png'>");
  $("#display-temp2").text(Math.round(daily[2].temp.day) + "\xB0" + "F");
  $("#display-wind2").text(Math.round(daily[2].wind_speed) + "mph");
  $("#display-hum2").text(daily[2].humidity + "%");

  $("#display-icon3").html("<img src='http://openweathermap.org/img/wn/"+daily[3].weather[0].icon+".png'>");
  $("#display-temp3").text(Math.round(daily[3].temp.day) + "\xB0" + "F");
  $("#display-wind3").text(Math.round(daily[3].wind_speed) + "mph");
  $("#display-hum3").text(daily[3].humidity + "%");

  $("#display-icon4").html("<img src='http://openweathermap.org/img/wn/"+daily[4].weather[0].icon+".png'>");
  $("#display-temp4").text(Math.round(daily[4].temp.day) + "\xB0" + "F");
  $("#display-wind4").text(Math.round(daily[4].wind_speed) + "mph");
  $("#display-hum4").text(daily[4].humidity + "%");

  $("#display-icon5").html("<img src='http://openweathermap.org/img/wn/"+daily[5].weather[0].icon+".png'>");
  $("#display-temp5").text(Math.round(daily[5].temp.day) + "\xB0" + "F");
  $("#display-wind5").text(Math.round(daily[5].wind_speed) + "mph");
  $("#display-hum5").text(daily[5].humidity + "%");
}


function displaySearches(city) {
  // console.log(city)
  var searchButtonEl = document.createElement("button");
  searchButtonEl.classList = "button is-info is-fullwidth";
  searchButtonEl.setAttribute("data-id", searchIdCounter);
  searchButtonEl.textContent = city;

  recentSearchEl.appendChild(searchButtonEl);

  searchIdCounter++;
}

function runSearches (event) {
  var searchEl = event.target;
  if (event.target.matches("button")){
    city=searchEl.textContent.trim();
    getCoordinates(city);
  }

}

// listens to formSubmitHandler and passes City Name to city
var saveSearch = function (city) {
  localStorage.setItem(searchIdCounter, city);
}

// var loadSearch = function () {

// }

// var loadSearches = function () {

// };

userInputEl.addEventListener("submit", formSubmitHandler);
recentSearchEl.addEventListener("click", runSearches);

// loadSearch();