const apiKey = '2512700ffb6ca1d2dd2cb722944bd9f8'; 
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');
const cityElement = document.getElementById('city');
const countryElement = document.getElementById('country');
const weatherDescriptionElement = document.getElementById('weatherDescription');
const temperatureElement = document.getElementById('temperature');
const minTemperatureElement = document.getElementById('minTemperature');
const maxTemperatureElement = document.getElementById('maxTemperature');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const errorMessage = document.getElementById('errorMessage');

// Radio buttons for temperature units
const celsiusRadioButton = document.getElementById('celsius');
const fahrenheitRadioButton = document.getElementById('fahrenheit');

searchButton.addEventListener('click', fetchWeatherData);
locationInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') { 
        fetchWeatherData();
    }
});

function fetchWeatherData() {
    const location = locationInput.value;
    if (!location) { 
        displayError('Please enter a location.'); 
        return;
    }
    errorMessage.textContent = '';
    
    // Get the selected temperature unit
    const temperatureUnit = fahrenheitRadioButton.checked ? 'imperial' : 'metric';
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${temperatureUnit}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            displayError('City not found');
        });
}

function displayWeatherData(data) {
    cityElement.textContent = data.name;
    countryElement.textContent = data.sys.country;
    weatherDescriptionElement.textContent = data.weather[0].description;
    temperatureElement.textContent = data.main.temp;
    minTemperatureElement.textContent = data.main.temp_min;
    maxTemperatureElement.textContent = data.main.temp_max;
    humidityElement.textContent = data.main.humidity;
    windSpeedElement.textContent = data.wind.speed;
    weatherInfo.style.display = 'block'; // Show weather information
}

function displayError(message) {
    errorMessage.textContent = message; 
    weatherInfo.style.display = 'none';
}
