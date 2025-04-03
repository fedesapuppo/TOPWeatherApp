import './styles.css';

const API_KEY = 'CNPNE6SYB22KNJRWP2J6JBZ65';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

async function getWeatherData(location) {
    try {
        const response = await fetch(`${BASE_URL}/${location}?key=${API_KEY}&unitGroup=metric&lang=es`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return processWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

function processWeatherData(data) {
    const currentConditions = data.currentConditions;
    const today = data.days[0];

    return {
        location: data.resolvedAddress,
        currentTemp: currentConditions.temp,
        minTemp: today.tempmin,
        maxTemp: today.tempmax,
        description: currentConditions.conditions
    };
}

function displayWeather(weatherData) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const locationName = document.getElementById('locationName');
    const currentTemp = document.getElementById('currentTemp');
    const minTemp = document.getElementById('minTemp');
    const maxTemp = document.getElementById('maxTemp');
    const weatherDescription = document.getElementById('weatherDescription');

    locationName.textContent = weatherData.location;
    currentTemp.textContent = Math.round(weatherData.currentTemp);
    minTemp.textContent = Math.round(weatherData.minTemp);
    maxTemp.textContent = Math.round(weatherData.maxTemp);
    weatherDescription.textContent = weatherData.description;

    weatherDisplay.classList.remove('hidden');
}

// Form submission handling
document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const locationInput = document.getElementById('location');
    const location = locationInput.value.trim();

    if (!location) {
        console.error('Please enter a location');
        return;
    }

    try {
        const weatherData = await getWeatherData(location);
        displayWeather(weatherData);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
});

// Example usage:
// getWeatherData('Buenos Aires').then(weather => console.log(weather));
