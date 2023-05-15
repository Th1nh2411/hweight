import * as httpRequest from '../utils/httpRequest';

export const register = async (param = {}) => {
    try {
        const res = await httpRequest.post(`account/create`, param);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
