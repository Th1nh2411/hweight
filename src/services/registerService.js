import * as httpRequest from '../utils/httpRequest';

export const register = async (param = {}) => {
    try {
        const res = await httpRequest.get(`8e6a0b1e-31b4-473c-a830-3c1681f28e0b`, param);
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
