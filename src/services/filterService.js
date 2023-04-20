import * as httpRequest from '../utils/httpRequest';

export const getSearchFilter = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get(`ingredients`);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
