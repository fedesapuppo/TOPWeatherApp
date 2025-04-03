import './styles.css';

const API_KEY = 'CNPNE6SYB22KNJRWP2J6JBZ65';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

// Weather icon mapping
const weatherIcons = {
    'clear': 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png',
    'partly-cloudy': 'https://cdn-icons-png.flaticon.com/512/3222/3222803.png',
    'cloudy': 'https://cdn-icons-png.flaticon.com/512/3222/3222804.png',
    'rain': 'https://cdn-icons-png.flaticon.com/512/3222/3222805.png',
    'snow': 'https://cdn-icons-png.flaticon.com/512/3222/3222806.png',
    'thunderstorm': 'https://cdn-icons-png.flaticon.com/512/3222/3222807.png',
    'fog': 'https://cdn-icons-png.flaticon.com/512/3222/3222808.png'
};

function getWeatherIcon(conditions) {
    const lowerConditions = conditions.toLowerCase();

    if (lowerConditions.includes('clear') || lowerConditions.includes('sunny')) {
        return weatherIcons['clear'];
    } else if (lowerConditions.includes('partly cloudy')) {
        return weatherIcons['partly-cloudy'];
    } else if (lowerConditions.includes('cloudy') || lowerConditions.includes('overcast')) {
        return weatherIcons['cloudy'];
    } else if (lowerConditions.includes('rain') || lowerConditions.includes('drizzle')) {
        return weatherIcons['rain'];
    } else if (lowerConditions.includes('snow') || lowerConditions.includes('sleet')) {
        return weatherIcons['snow'];
    } else if (lowerConditions.includes('thunder') || lowerConditions.includes('storm')) {
        return weatherIcons['thunderstorm'];
    } else if (lowerConditions.includes('fog') || lowerConditions.includes('mist')) {
        return weatherIcons['fog'];
    }

    // Default icon
    return weatherIcons['clear'];
}

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
        description: currentConditions.conditions,
        icon: getWeatherIcon(currentConditions.conditions)
    };
}

function displayWeather(weatherData) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const locationName = document.getElementById('locationName');
    const currentTemp = document.getElementById('currentTemp');
    const minTemp = document.getElementById('minTemp');
    const maxTemp = document.getElementById('maxTemp');
    const weatherDescription = document.getElementById('weatherDescription');
    const weatherIcon = document.getElementById('weatherIcon');

    locationName.textContent = weatherData.location;
    currentTemp.textContent = Math.round(weatherData.currentTemp);
    minTemp.textContent = Math.round(weatherData.minTemp);
    maxTemp.textContent = Math.round(weatherData.maxTemp);
    weatherDescription.textContent = weatherData.description;
    weatherIcon.src = weatherData.icon;

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
