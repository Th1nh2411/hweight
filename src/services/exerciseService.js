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
export const completeExercise = async (id, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.put(`exercise/check/${id}`, {}, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getComment = async (id_exercise, token, page = 1, limit = 5) => {
    const config = {
        headers: { access_token: token },
        params: {
            id_exercise,
            limit,
            page,
        },
    };
    try {
        const res = await httpRequest.get(`exercise/cmt`, config); //menu
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const postComment = async (idExercise, cmt, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.put(`exercise/cmt/${idExercise}`, { cmt }, config); //menu
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const putIsLiked = async (id_exercise, isLike, token) => {
    const config = {
        headers: { access_token: token },
        params: {
            isLike,
            id_exercise,
        },
    };
    try {
        const res = await httpRequest.put(`exercise/like`, {}, config); //menu
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
