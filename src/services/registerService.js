import * as httpRequest from '../utils/httpRequest';

export const register = async (param = {}) => {
    try {
        const res = await httpRequest.post(`accounts`, param);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
