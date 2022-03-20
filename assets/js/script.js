var userInputEl = document.querySelector("#input-form");
var submitButtonEl = document.querySelector("#search-btn");
var thisIsCityEl = document.querySelector("#cityname");
var displayCityEl = document.querySelector("#display-city");
var weatherContainerEl = document.querySelector("#weather-container");
var recentSearchEl = document.querySelector("#recent-searches");
var forecastBoxesEl = document.querySelector("#forecast-boxes")

var searchIdCounter = 0;

var apiKey = "edb9f78900c4573920e4c01ff60162d2";

// URL for calling API for City
// https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey

// function for calling Geocoding API by searching a city
// - After getting data from the json, extract lat and lon coordinates
// - Pass lat and lon coordinates through One Call API
// Fetch 5-Day Forecast API

// add search history to localstorage
// - store name and do another API using that value

var formSubmitHandler = function(event) {
  event.preventDefault();
  // get city name from form
  var cityname = thisIsCityEl.value.trim();
  if (cityname) {
    getCoordinates(cityname)
    displayWeather(cityname)
    displaySearches(cityname)
    saveSearch(cityname)
  } else {
    displayCityEl.textContent = "Error: City Not Found";
  }
}

function getCoordinates(city) {
  $.ajax({
    type:"GET",
    url:"https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey,
    async:true,
    dataType: "json",
    success: function(json) {
      getCoordinates.json = json;
      getWeather(json.coord);
    },
    error: function(err) {
      console.log(err);
    }
  })
}

function getWeather (coord) {
  $.ajax({
    type:"GET",
    url:"https://api.openweathermap.org/data/2.5/onecall?lat="+coord.lat+"&lon="+coord.lon+"&units=imperial&appid="+apiKey,
    async:true,
    dataType: "json",
    success: function(json) {
      getWeather.json = json;
      displayWeather(json.current);
      displayForecast(json.daily);
    },
    error: function(err) {
      console.log(err);
    }
  })
}

function displayWeather(current) {
  // format city name
  var displayDate = moment(current.dt*1000).format('MM-DD-YYYY');
  var displayCity = thisIsCityEl.value.trim();
  displayCityEl.textContent = "Showing Weather for: "+displayCity+" ("+displayDate+")";

  $("#display-temp").text(current.temp + "\xB0" + "F");
  $("#display-wind").text(current.wind_speed + "mph");
  $("#display-hum").text(current.humidity + "%");
  $("#display-uvi").text(current.uvi);

  if (current.uvi <= 2) {
    $("#display-uvi").addClass("favorable");
  } else if (current.uvi >= 3 || current.uvi <= 5) {
    $("#display-uvi").addClass("moderate");
  } else if (current.uvi >= 6 || current.uvi <= 7) {
    $("#display-uvi").addClass("high");
  } else if (current.uvi >= 8 || current.uvi <= 10) {
    $("#display-uvi").addClass("very-high");
  } else if (current.uvi >= 11) {
    $("#display-uvi").addClass("extreme");
  };

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
  $("#display-temp1").text(daily[1].temp.day + "\xB0" + "F");
  $("#display-wind1").text(daily[1].wind_speed + "mph");
  $("#display-hum1").text(daily[1].humidity + "%");

  $("#display-temp2").text(daily[2].temp.day + "\xB0" + "F");
  $("#display-wind2").text(daily[2].wind_speed + "mph");
  $("#display-hum2").text(daily[2].humidity + "%");

  $("#display-temp3").text(daily[3].temp.day + "\xB0" + "F");
  $("#display-wind3").text(daily[3].wind_speed + "mph");
  $("#display-hum3").text(daily[3].humidity + "%");

  $("#display-temp4").text(daily[4].temp.day + "\xB0" + "F");
  $("#display-wind4").text(daily[4].wind_speed + "mph");
  $("#display-hum4").text(daily[4].humidity + "%");

  $("#display-temp5").text(daily[5].temp.day + "\xB0" + "F");
  $("#display-wind5").text(daily[5].wind_speed + "mph");
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

// listens to formSubmitHandler and passes City Name to city
var saveSearch = function (city) {
  localStorage.setItem(searchIdCounter, city);
}

userInputEl.addEventListener("submit", formSubmitHandler)
// recentSearchEl.addEventListener("submit", )