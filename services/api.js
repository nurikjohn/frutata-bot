const axios = require('axios');
require('dotenv').config();

const base_url = process.env.API_BASE_URL;
const token = process.env.API_TOKEN;

const api = axios.create({
    baseURL: base_url,
    // headers: {
    //     Authorization: `Bearer ${token}`,
    // },
});

exports.Users = {
    get: async (userID) => {
        try {
            const { data } = await api.get(`users?_where[0][userId]=${userID}`);

            return data;
        } catch (error) {
            console.log(error.response);
            return {
                success: false,
                ...error.response?.data,
            };
        }
    },
    create: async (body) => {
        try {
            const { data } = await api.post(`users`, body);

            return data;
        } catch (error) {
            return error.response.data;
        }
    },
    update: async (id, body) => {
        try {
            const { data } = await api.put(`users/${id}`, body);

            return data;
        } catch (error) {
            return error.response.data;
        }
    },
};

exports.Products = {
    getByPackage: async (package) => {
        try {
            const { data } = await api.get(`products`, {
                params: {
                    [`_where[0][package]`]: package,
                },
            });

            return data;
        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
        }
    },
    getByName: async (name, language, package) => {
        try {
            const { data } = await api.get(`products`, {
                params: {
                    [`_where[0][name_${language}]`]: name,
                    [`_where[0][package]`]: package,
                },
            });

            return data;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    },
};

exports.Orders = {
    create: async (body) => {
        try {
            const { data } = await api.post(`orders`, body);

            return data;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    },
    status: async (id, status) => {
        try {
            const { data } = await api.put(`orders/${id}`, { status });

            return data;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    },
};

exports.Settings = {
    get: async () => {
        try {
            const { data } = await api.get(`settings`);

            return data;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    },
};
