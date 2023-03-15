import * as httpRequest from '../utils/httpRequest';

export const getProfile = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`profile`, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateProfile = async (data, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.patch(`profile`, data, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
