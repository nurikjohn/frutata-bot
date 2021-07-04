const axios = require('axios');
require('dotenv').config();

const base_url = process.env.GEOCODE_API_URL;

const api = axios.create({
    baseURL: base_url,
});

module.exports = {
    get: async ({ latitude, longitude }, language) => {
        try {
            const { data } = await api.get('/', {
                params: {
                    lat: latitude,
                    lon: longitude,
                    format: 'json',
                    'accept-language': language,
                },
            });

            return data;
        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
        }
    },
};
