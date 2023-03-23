import * as httpRequest from '../utils/httpRequest';

export const getRecipe = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`recipe`, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateRecipe = async (data, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.patch(`recipe`, data, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
