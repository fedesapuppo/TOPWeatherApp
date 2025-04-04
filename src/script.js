import './styles.css';
import { fetchWeatherData } from './modules/weatherApi';
import { processWeatherData } from './modules/weather';
import { displayWeather, initializeUI } from './modules/ui';
import { defaultLang, getTranslation } from './translations';

// The language to use for the UI and API calls
const LANGUAGE = defaultLang;

/**
 * Initialize the app
 */
function init() {
  // Set up UI with translations
  initializeUI(LANGUAGE);

  // Form submission handling
  document.getElementById('weatherForm').addEventListener('submit', handleFormSubmit);
}

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  const locationInput = document.getElementById('location');
  const location = locationInput.value.trim();

  if (!location) {
    console.error(getTranslation('errorEmpty', LANGUAGE));
    return;
  }

  try {
    // Fetch weather data using English for clear descriptions
    const data = await fetchWeatherData(location, 'en');

    // Process data with translations for the selected language
    const weatherData = await processWeatherData(data, LANGUAGE);

    // Display the weather information
    displayWeather(weatherData, LANGUAGE);
  } catch (error) {
    console.error(getTranslation('errorFetch', LANGUAGE), error);
    alert(getTranslation('errorFetch', LANGUAGE));
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);