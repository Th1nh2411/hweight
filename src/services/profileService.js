import * as httpRequest from '../utils/httpRequest';

export const profile = async (token) => {
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
