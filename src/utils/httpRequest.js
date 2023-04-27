import axios from 'axios';
const httpRequest = axios.create({
    baseURL: 'http://localhost:3000/',
});
export const get = async (path, header = {}) => {
    const response = await axios.get(path, header);
    return response.data;
};
export const post = async (path, body = {}, header = {}) => {
    const response = await axios.post(path, body, header);
    return response.data;
};
export const del = async (path, header = {}) => {
    const response = await axios.delete(path);
    return response.data;
};
export const put = async (path, body = {}, header = {}) => {
    const response = await axios.put(path, body, header);
    return response.data;
};
export const patch = async (path, body = {}, header = {}) => {
    const response = await axios.patch(path, body, header);
    return response.data;
};
// export default httpRequest;
