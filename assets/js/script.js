var userInputEl = document.querySelector("#input-form");
var submitButtonEl = document.querySelector("#search-btn");
var thisIsCityEl = document.querySelector("#cityname");
var displayCityEl = document.querySelector("#display-city");
var weatherContainerEl = document.querySelector("#weather-container");
var recentSearchEl = document.querySelector("#recent-searches");

var apiKey = "edb9f78900c4573920e4c01ff60162d2";

// URL for calling API for City
// https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey

// function for calling Geocoding API by searching a city
// - After getting data from the json, extract lat and lon coordinates
// - Pass lat and lon coordinates through One Call API
// Fetch 5-Day Forecast API

// add search history to localstorage
// - store name and do another API using that value
// 
// UV Index
// - 0-2.9 = Favorable
// - 3-5 = Moderate
// - 5.1

var formSubmitHandler = function(event) {
  event.preventDefault();
  // get city name from form
  var cityname = thisIsCityEl.value.trim();
  if (cityname) {
    getCoordinates(cityname)
    displaySearches(cityname);
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
      console.log(json)
      getCoordinates.json = json;
      getWeather(json.coord);
      // getForecast(json.coord);
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
      console.log(json);
      getWeather.json = json;
      displayWeather(json);
      displayForecast(json.daily);
    },
    error: function(err) {
      console.log(err);
    }
  })
}

function displayForecast (daily) {
  console.log(daily);

}

function displayWeather(data) {
  // format city name
  var displayCity = thisIsCityEl.value.trim();
  displayCityEl.textContent = "Showing Weather for: "+displayCity;

  data.current.humidity
  data.current.temp
  data.current.uvi
  data.current.wind_speed


}

function displaySearches(city) {
  console.log(city)
  var displayCity = thisIsCityEl.value.trim();
  var searchButtonEl = document.createElement("button");
  searchButtonEl.classList = "button is-info is-fullwidth ";
  searchButtonEl.textContent = displayCity;

  recentSearchEl.appendChild(searchButtonEl);
}



userInputEl.addEventListener("submit", formSubmitHandler)