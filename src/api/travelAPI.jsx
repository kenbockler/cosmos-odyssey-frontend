// src/api/travelAPI.jsx
import axios from 'axios';

const BASE_URL = 'https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices';

export const fetchTravelPrices = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching travel prices:', error);
        throw error;
    }
};