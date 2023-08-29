import * as httpRequest from '../utils/httpRequest';

export const getExercise = async (level, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`edc71770-305c-4bec-872c-4d3180ac035e`, config); // exercise
        return res.data;
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
        const res = await httpRequest.get(`b5b7bd02-42a1-4ce1-9441-288d7270dbb2`, config); //exercise/${id}
        return res.data;
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
        const res = await httpRequest.get(`9e43ceaf-0df6-4730-bf5a-030103aeb3f1`, config); //menu
        return res.data;
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
