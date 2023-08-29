import * as httpRequest from '../utils/httpRequest';

export const login = async (param = {}) => {
    try {
        const res = await httpRequest.get(`00f5db9c-79d5-44ba-8b4f-db972e7e6cdd`, param); //account
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
