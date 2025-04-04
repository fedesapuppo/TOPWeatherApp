import { translateText, translateWeatherDescription } from './translateApi';
import { getTranslation, defaultLang } from '../translations';

/**
 * Process raw weather data from API into user-friendly format
 * @param {Object} data - Raw weather data from API
 * @param {string} language - Language for translations
 * @returns {Promise<Object>} - Processed weather data
 */
export async function processWeatherData(data, language = defaultLang) {
  const currentConditions = data.currentConditions;
  const today = data.days[0];

  // Translate the location name to the requested language
  let translatedLocation = await translateText(data.resolvedAddress, language);

  // Remove any leading colons and spaces
  translatedLocation = translatedLocation.replace(/^:\s*/, '');

  // Get the icon URL based on the API's icon value
  const iconUrl = getIconUrl(currentConditions.icon);

  // Translate weather conditions
  // If the API sends a specific code like 'type_43', use our translations
  let conditions = currentConditions.conditions;
  if (conditions.startsWith('type_')) {
    conditions = getTranslation(conditions, language) || conditions;
  } else if (language !== 'en') {
    // Otherwise translate the English condition to the target language
    conditions = getTranslation(conditions, language) ||
                await translateText(conditions, language);
  }

  // Get the main description and translate it
  const mainDescription = data.description || today.description;
  const translatedDescription = await translateWeatherDescription(mainDescription, getTranslation, language);

  return {
    location: translatedLocation,
    currentTemp: currentConditions.temp,
    minTemp: today.tempmin,
    maxTemp: today.tempmax,
    conditions: conditions,
    description: translatedDescription,
    icon: iconUrl
  };
}

/**
 * Get icon URL based on the Visual Crossing icon code
 * @param {string} iconCode - Icon code from the API
 * @returns {string} - URL to the weather icon
 */
function getIconUrl(iconCode) {
  // Use Weather Icons from Visual Crossing or another source
  const iconMap = {
    'clear-day': 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png',
    'clear-night': 'https://cdn-icons-png.flaticon.com/512/3222/3222801.png',
    'partly-cloudy-day': 'https://cdn-icons-png.flaticon.com/512/3222/3222803.png',
    'partly-cloudy-night': 'https://cdn-icons-png.flaticon.com/512/3222/3222802.png',
    'cloudy': 'https://cdn-icons-png.flaticon.com/512/3222/3222804.png',
    'rain': 'https://cdn-icons-png.flaticon.com/512/3222/3222805.png',
    'snow': 'https://cdn-icons-png.flaticon.com/512/3222/3222806.png',
    'thunderstorm': 'https://cdn-icons-png.flaticon.com/512/3222/3222807.png',
    'fog': 'https://cdn-icons-png.flaticon.com/512/3222/3222808.png',
    'wind': 'https://cdn-icons-png.flaticon.com/512/3222/3222809.png'
  };

  return iconMap[iconCode] || iconMap['clear-day']; // Default to clear-day if icon not found
}

/**
 * Format temperature for display
 * @param {number} temp - Temperature value
 * @returns {number} - Rounded temperature
 */
export function formatTemperature(temp) {
  return Math.round(temp);
}

export default {
  processWeatherData,
  formatTemperature
};