import { formatTemperature } from './weather';
import { getTranslation } from '../translations';

/**
 * Update the HTML elements with weather data
 * @param {Object} weatherData - Processed weather data
 * @param {string} language - Language for UI elements
 */
export function displayWeather(weatherData, language) {
  const weatherDisplay = document.getElementById('weatherDisplay');
  const locationName = document.getElementById('locationName');
  const currentTemp = document.getElementById('currentTemp');
  const minTemp = document.getElementById('minTemp');
  const maxTemp = document.getElementById('maxTemp');
  const weatherConditions = document.getElementById('weatherDescription');
  const weatherDetailsDiv = document.getElementById('weatherDetails') || createWeatherDetailsElement();
  const weatherIcon = document.getElementById('weatherIcon');

  locationName.textContent = weatherData.location;
  currentTemp.textContent = formatTemperature(weatherData.currentTemp);
  minTemp.textContent = formatTemperature(weatherData.minTemp);
  maxTemp.textContent = formatTemperature(weatherData.maxTemp);
  weatherConditions.textContent = weatherData.conditions;
  weatherDetailsDiv.textContent = weatherData.description;
  weatherIcon.src = weatherData.icon;
  weatherIcon.alt = weatherData.conditions;

  weatherDisplay.classList.remove('hidden');
}

/**
 * Creates weather details element if it doesn't exist
 * @returns {HTMLElement} The weather details element
 */
function createWeatherDetailsElement() {
  const weatherInfo = document.querySelector('.weather-info');
  const detailsDiv = document.createElement('div');
  detailsDiv.id = 'weatherDetails';
  detailsDiv.className = 'weather-details';

  // Add after the description
  const descriptionElement = document.getElementById('weatherDescription');
  if (descriptionElement && descriptionElement.parentNode) {
    descriptionElement.parentNode.insertBefore(detailsDiv, descriptionElement.nextSibling);
  } else if (weatherInfo) {
    weatherInfo.appendChild(detailsDiv);
  }

  return detailsDiv;
}

/**
 * Initialize UI with translations
 * @param {string} language - Language for UI elements
 */
export function initializeUI(language) {
  document.title = getTranslation('appTitle', language);

  // Update form elements
  const locationLabel = document.querySelector('label[for="location"]');
  const locationInput = document.getElementById('location');
  const submitButton = document.querySelector('button[type="submit"]');
  const minLabel = document.querySelector('.temp-range span:nth-child(1)');
  const maxLabel = document.querySelector('.temp-range span:nth-child(3)');

  if (locationLabel) locationLabel.textContent = getTranslation('enterLocation', language) + ':';
  if (locationInput) locationInput.placeholder = getTranslation('locationPlaceholder', language);
  if (submitButton) submitButton.textContent = getTranslation('getWeather', language);
  if (minLabel) minLabel.textContent = `${getTranslation('min', language)}: `;
  if (maxLabel) maxLabel.textContent = `${getTranslation('max', language)}: `;
}

export default {
  displayWeather,
  initializeUI
};