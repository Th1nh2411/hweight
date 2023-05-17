import * as httpRequest from '../utils/httpRequest';

export const getExercise = async (level, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`exercise/page/${level}`, config); // exercise
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getDetailExercise = async (id, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`exercise/detail/${id}`, config); //exercise/${id}
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateExercise = async (id, data, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.patch(`exercise/${id}`, data, token);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
