import * as httpRequest from '../utils/httpRequest';

export const login = async (param = {}) => {
    try {
        const res = await httpRequest.post(`accounts`, param);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getToken = async (config = {}) => {
    try {
        const res = await httpRequest.get(`login`, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
