import axios from 'axios';
const httpRequest = axios.create({
    baseURL: 'https://mocki.io/v1/',
});
export const get = async (path, header = {}) => {
    const response = await httpRequest.get(path, header);
    return response;
};
export const post = async (path, body = {}, header = {}) => {
    const response = await httpRequest.post(path, body, header);
    return response;
};
export const del = async (path, header = {}) => {
    const response = await httpRequest.delete(path);
    return response;
};
export const put = async (path, body = {}, header = {}) => {
    const response = await httpRequest.put(path, body, header);
    return response;
};
export const patch = async (path, body = {}, header = {}) => {
    const response = await httpRequest.patch(path, body, header);
    return response;
};
// export default httpRequest;
