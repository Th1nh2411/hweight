import * as httpRequest from '../utils/httpRequest';

export const register = async (param = {}) => {
    try {
        const res = await httpRequest.post(`https://mocki.io/v1/503b8a46-100a-4112-86e3-6854cbe56164`, param);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
