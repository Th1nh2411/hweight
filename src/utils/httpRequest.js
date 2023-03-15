import axios from 'axios';
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
export const post = async (path, body = {}, header = {}) => {
    const response = await httpRequest.post(path, body, header);
    return response.data;
};
export const patch = async (path, body = {}, header = {}) => {
    const response = await httpRequest.patch(path, body, header);
    return response.data;
};
export default httpRequest;
