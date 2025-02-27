import axios from 'axios';

const BASE_URL = process.env.REACT_APP_FETCH_BASE_URL

const fetchClient = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
})

const getUrl = async (url) => {
    try {
        const response = await fetchClient.get(url);
        return response.data;
    } catch (error) {
        console.log(`Error accessing ${url}:`, error);
    }
};

const getUrlWithParams = async (url, params) => {
    try {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetchClient.get(`${url}?${queryString}`);
        debugger
        return response.data;
    } catch (error) {
        console.log(`Error accessing ${url}:`, error);
    }
};

const postUrl = async (url, body = {}) => {
    try {
        let response = await fetchClient.post(url, body);
        return response.data;
    } catch (error) {
        console.log(`Error posting ${url}:`, error);
    }
};

export { getUrl, getUrlWithParams, postUrl };
