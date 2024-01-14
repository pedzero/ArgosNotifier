import axios from 'axios';

export async function makeAPIRequest(url, method = 'GET', headers = {}, params = {}) {
    try {
        const response = await axios({
            method,
            url,
            headers,
            params,
        });

        return response.data;
    } catch (error) {
        console.error('Error making API request:', error.message);
        throw error;
    }
}