import * as httpRequest from '../utils/httpRequest';

export const getExercise = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`exercise`, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateExercise = async (id, data, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.patch(`exercise/${id}`, data, token);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
