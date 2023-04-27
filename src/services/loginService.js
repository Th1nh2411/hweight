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
        const res = await httpRequest.get(`https://mocki.io/v1/75c740d2-4b27-4bd5-984e-bd701055c1d3`, config); //login
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
