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

// function to create elements for current day weather
function currentDayEl(forecastData) {
    
    let currentData = document.getElementById('today');
    currentData.setAttribute('class', 'border mt-2 p-2');

    let cityName = document.createElement('h2');
    let dateCurrent = dayjs.unix(forecastData.dt);
    cityName.textContent = `City: ` + forecastData.name + ` (${dayjs(dateCurrent).format('DD/MM/YYYY')})`;

    let icon = document.createElement('img');
    icon.setAttribute('src', src=`https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`);

    let temp = document.createElement('p');
    temp.textContent = `Tempature: ` + forecastData.main.temp + `°C`;

    let humidity = document.createElement('p');
    humidity.textContent = `Humidity: ` + forecastData.main.humidity + `%`;

    let windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind speed: ` + forecastData.wind.speed + `km/h`;

    cityName.appendChild(icon);
    currentData.append(cityName, temp, humidity, windSpeed);
};

// function to create element for 5 days weather forecast
function forecast5dayEl(forecastData) {

    let forecastEl = document.getElementById('forecast');
    let forecastTitle = document.createElement('h3');
    forecastTitle.textContent = '5-day forecast: '

    let forecastContainer = document.createElement('div');
    forecastContainer.setAttribute('class', 'd-flex justify-content-between');
    forecastEl.append(forecastTitle,forecastContainer);

    for (let i=7; i < 40; i+=8){

    let datesArray = forecastData.list[i];

    let dateBox = document.createElement('div');
    dateBox.setAttribute('class', 'bg-primary-subtle col-lg-2  p-2');

    let date = document.createElement('h4');
    let dateCurrent = dayjs.unix(datesArray.dt);
    date.textContent = `${dayjs(dateCurrent).format('DD/MM/YYYY')}`;

    let icon = document.createElement('img');
    icon.setAttribute('src', src=`https://openweathermap.org/img/wn/${datesArray.weather[0].icon}.png`);

    let temp = document.createElement('p');
    temp.textContent = `Tempature: ` + datesArray.main.temp + `°C`;

    let humidity = document.createElement('p');
    humidity.textContent = `Humidity: ` + datesArray.main.humidity + `%`;

    let windSpeed = document.createElement('p');
    windSpeed.textContent = `Wind speed: ` + datesArray.wind.speed + `km/h`;

    dateBox.append(date, icon, temp, humidity, windSpeed);

    forecastContainer.append(dateBox);
    };
};

// function to store city name to local storage
function storeCityName(cityName) {

    let searchHistory = JSON.parse(localStorage.getItem('City')) || [];

    if(searchHistory.includes(cityName) !== true){
        searchHistory.push(cityName);
        localStorage.setItem('City', JSON.stringify(searchHistory));
    };
    listCityButtons();
};
    
//function to list history search as buttons
function listCityButtons(){

    let searchHistory = JSON.parse(localStorage.getItem('City')) || [];

    for(let i = 0; i < searchHistory.length; i++) {

        let historyBox = document.getElementById('history');
        let buttonCity = document.createElement('button');
        buttonCity.setAttribute('class', 'btn btn-outline-primary m-2 ');
        buttonCity.textContent = searchHistory[i];
        buttonCity.addEventListener('click', getDataButton);
        historyBox.append(buttonCity);
    };
};

// function to get weather info after clicking on buttons in search history section
function getDataButton(event){
    event.preventDefault();

    let buttonCityName = event.target.textContent;

    getDataWeather(buttonCityName);
};

listCityButtons();
