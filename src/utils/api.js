import axios from 'axios';

const BASE_URL = process.env.REACT_APP_FETCH_BASE_URL

const fetchClient = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
})

const getUrlWithParams = async (url, params = new URLSearchParams()) => {
    if (params.toString()  === "") {
        params.append("sort", "breed:asc");
    }

    try {
        const queryString = params.toString();
        const response = await fetchClient.get(`${url}?${queryString}`);
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

export { getUrlWithParams, postUrl };
