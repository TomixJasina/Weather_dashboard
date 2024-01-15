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
