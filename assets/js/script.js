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

// function to fetch forecast for 5 days info

function forecast5days(lat,lon) {
    let forecast5daysURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKEY}&units=metric`;

    fetch(forecast5daysURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        forecast5dayEl(data);
    })
};

function currentDayEl(forecastData) {
    
    let currentData = document.getElementById('today');
    currentData.setAttribute('class', 'border mt-2 p-2');

    let cityName = document.createElement('h2');
    let dateCurrent = dayjs.unix(forecastData.dt);
    cityName.textContent = `City: ` + forecastData.name + ` (${dayjs(dateCurrent).format('DD/MM/YYYY')})`;

    let icon = document.createElement('img');
    icon.setAttribute('src', src=`http://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`);

    let temp = document.createElement('p');
    temp.textContent = `Tempature: ` + forecastData.main.temp + `°C`;

    let humidity = document.createElement('p');
    humidity.textContent = `Humidity: ` + forecastData.main.humidity + `%`;

    let windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind speed: ` + forecastData.wind.speed + `km/h`;

    cityName.appendChild(icon);
    currentData.append(cityName, temp, humidity, windSpeed);
};
