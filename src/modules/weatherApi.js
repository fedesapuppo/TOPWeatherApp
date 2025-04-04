// API constants
const API_KEY = 'CNPNE6SYB22KNJRWP2J6JBZ65';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

/**
 * Fetch weather data from Visual Crossing API
 * @param {string} location - Location to get weather for
 * @param {string} language - Language code for the response
 * @returns {Promise<Object>} - Weather data
 */
export async function fetchWeatherData(location, language = 'en') {
  try {
    const response = await fetch(`${BASE_URL}/${location}?key=${API_KEY}&unitGroup=metric&lang=${language}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export default {
  fetchWeatherData
};