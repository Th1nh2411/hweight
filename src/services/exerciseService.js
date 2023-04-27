import * as httpRequest from '../utils/httpRequest';

export const getExercise = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`https://mocki.io/v1/d7260cb3-fd0e-4ef2-ba85-4eb777ec382f`, config); // exercise
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getDetailExercise = async (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`https://mocki.io/v1/d1d22cff-1b31-4bad-b373-7af58e1ebb24`, config); //exercise/${id}
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
