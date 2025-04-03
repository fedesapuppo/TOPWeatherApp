const API_KEY = 'CNPNE6SYB22KNJRWP2J6JBZ65';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

async function getWeatherData(location) {
    try {
        const response = await fetch(`${BASE_URL}/${location}?key=${API_KEY}&unitGroup=metric&lang=es`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Weather Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Example usage:
// getWeatherData('Buenos Aires');
