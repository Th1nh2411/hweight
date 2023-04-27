import * as httpRequest from '../utils/httpRequest';

export const getProfile = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`https://mocki.io/v1/750bacd9-b902-4b7c-b3a6-a6eff5d75eee`, config); //profile
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
        const res = await httpRequest.patch(`https://mocki.io/v1/750bacd9-b902-4b7c-b3a6-a6eff5d75eee`, data, config); //profile
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
