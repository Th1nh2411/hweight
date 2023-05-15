import * as httpRequest from '../utils/httpRequest';

export const getSearchFilter = async (token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`ingredient`, config); //ingredients
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
