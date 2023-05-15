import * as httpRequest from '../utils/httpRequest';

export const login = async (param = {}) => {
    try {
        const res = await httpRequest.post(`account/login`, param); //account
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
