import axios from 'axios';
const httpRequest = axios.create({
    baseURL: 'http://192.168.1.19:3005/',
});
export const get = async (path, header = {}) => {
    const response = await httpRequest.get(path, header);
    return response.data;
};
export const post = async (path, body = {}, header = {}) => {
    const response = await httpRequest.post(path, body, header);
    return response.data;
};
export const del = async (path, header = {}) => {
    const response = await httpRequest.delete(path);
    return response.data;
};
export const put = async (path, body = {}, header = {}) => {
    const response = await httpRequest.put(path, body, header);
    return response.data;
};
export const patch = async (path, body = {}, header = {}) => {
    const response = await httpRequest.patch(path, body, header);
    return response.data;
};
// export default httpRequest;
