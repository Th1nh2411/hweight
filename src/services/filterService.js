import * as httpRequest from '../utils/httpRequest';

export const getSearchFilter = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get(`https://mocki.io/v1/cfaaa71f-9c4c-4204-bd0c-75f5d668bdf1`); //ingredients
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
