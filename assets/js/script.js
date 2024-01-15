//global vars
const apiKEY = '1f16e444f57239f90a3d711eb12384dd';

let submitButton = document.getElementById('search-button');

//initiate function after sumbit city name

submitButton.addEventListener('click', function(event){
    
    event.preventDefault();
    
    let city = document.getElementById("search-input").value;

    if(city !==''){
    getDataWeather(city);
    } else {
        return;
    }
});

// function to get location of the searched city and then start other functions

function getDataWeather(city){

document.getElementById('today').innerHTML = '';

document.getElementById('forecast').innerHTML = '';

document.getElementById('history').innerHTML = '';

let getLocationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKEY}&units=metric`;

fetch(getLocationURL)
.then(function (response){
    return response.json();
})
.then(function(data){
    let latLoc = data[0].lat;
    let lonLoc = data[0].lon;
    let cityName = data[0].name;

    currentDay(latLoc,lonLoc);
    forecast5days(latLoc,lonLoc);
    storeCityName(cityName);
})
};

// function to fetch current day weather info
function currentDay(lat,lon){
    let currentDayURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKEY}&units=metric`;
    
    fetch(currentDayURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        currentDayEl(data);
    })
};
