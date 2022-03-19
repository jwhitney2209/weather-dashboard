var userInputEl = document.querySelector("#input-form");
var submitButtonEl = document.querySelector("#search-btn");
var thisIsCityEl = document.querySelector("#cityname");
var displayCityEl = document.querySelector("#display-city");

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

function getCoordinates(city) {
  $.ajax({
    type:"GET",
    url:"https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey,
    async:true,
    dataType: "json",
    success: function(json) {
      getCoordinates.json = json;
      getWeather(json.coord);
      getForecast(json.coord);
    },
    error: function(err) {
      console.log(err);
    }
  });  
};

function getWeather (coord) {
  console.log(coord)
  $.ajax({
    type:"GET",
    url:"https://api.openweathermap.org/data/2.5/onecall?lat="+coord.lat+"&lon="+coord.lon+"&units=imperial&appid="+apiKey,
    async:true,
    dataType: "json",
    success: function(json) {
      console.log(json);
      // getWeather.json = json;
      // showForecast(json);
    },
    error: function(err) {
      console.log(err);
    }
  });
};

function getForecast (coord) {
  console.log(coord)
  $.ajax({
    type:"GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?lat="+coord.lat+"&lon="+coord.lon+"&units=imperial&appid="+apiKey,
    async:true,
    dataType: "json",
    success: function(json) {
      console.log(json);
    },
    error: function(err) {
      console.log(err);
    }
  });
};

var formSubmitHandler = function(event) {
  event.preventDefault();
  // get city name from form
  var cityname = thisIsCityEl.value.trim();
  if (cityname) {
    getCoordinates(cityname);
  } else {
    displayCityEl.textContent = "City Not Found";
  };
};


userInputEl.addEventListener("submit", formSubmitHandler);