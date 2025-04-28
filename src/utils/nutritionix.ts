
// Use the free Nutritionix API
const NUTRITIONIX_APP_ID = '3b2f3e47';
const NUTRITIONIX_APP_KEY = 'c2bc7c3be5b5aefeea5e386530ea7194';

export const searchFood = async (query: string) => {
  try {
    const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'x-app-id': NUTRITIONIX_APP_ID,
        'x-app-key': NUTRITIONIX_APP_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch food data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching food:', error);
    throw error;
  }
};

export const getNutritionInfo = async (query: string) => {
  try {
    const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      headers: {
        'x-app-id': NUTRITIONIX_APP_ID,
        'x-app-key': NUTRITIONIX_APP_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch nutrition info');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting nutrition info:', error);
    throw error;
  }
};
