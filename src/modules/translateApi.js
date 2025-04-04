/**
 * Translate text using the MyMemory API
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code
 * @returns {Promise<string>} - Translated text
 */
export async function translateText(text, targetLang = 'es') {
  try {
    // Use the entire text
    const textToTranslate = text.trim();

    // Detect language by checking character sets
    let sourceLang = 'en'; // Default to English

    if (/[\u0400-\u04FF]/.test(textToTranslate)) {
      sourceLang = 'ru'; // Russian
    } else if (/[\u4E00-\u9FFF]/.test(textToTranslate)) {
      sourceLang = 'zh'; // Chinese
    }

    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${sourceLang}|${targetLang}`);

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData.translatedText) {
      return data.responseData.translatedText;
    } else {
      console.warn('Translation failed, using original text:', data);
      return textToTranslate;
    }
  } catch (error) {
    console.error('Error translating text:', error);
    return text.trim();
  }
}

/**
 * Translate a weather description with common weather patterns
 * @param {string} description - Weather description to translate
 * @param {Function} getTranslation - Function to get translations from locale files
 * @param {string} language - Target language code
 * @returns {Promise<string>} - Translated description
 */
export async function translateWeatherDescription(description, getTranslation, language) {
  if (!description) return '';

  // If we're already using the target language, return as is
  if (language === 'en') return description;

  try {
    // For English descriptions, we can directly use the translation API
    // This will give better results than trying to break it down
    const translatedDesc = await translateText(description, language);

    // Capitalize the first letter
    return translatedDesc.charAt(0).toUpperCase() + translatedDesc.slice(1);
  } catch (error) {
    console.error('Error translating weather description:', error);
    return description;
  }
}

export default {
  translateText,
  translateWeatherDescription
};