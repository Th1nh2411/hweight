import * as httpRequest from '../utils/httpRequest';

export const getHistory = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`history`, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateHistory = async (data, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.patch(`history`, data, token);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
