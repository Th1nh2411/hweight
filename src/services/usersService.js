import * as httpRequest from '../utils/httpRequest';

export const getUsers = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`users`, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getDetailUser = async (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`detailUsers/${id}`, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
