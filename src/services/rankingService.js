import * as httpRequest from '../utils/httpRequest';

export const getRankRecipe = async (token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`recipe/rank`, config); //recipe/${day}
        return res; //only res
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateRankRecipe = async (token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.put(`recipe/updateRank`, {}, config); //recipe/${day}
        return res; //only res
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getRankExercise = async (token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`exercise/rank`, config); //recipe/${day}
        return res; //only res
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getUsers = async (token, min = 0, max = 33, page = 1, limit = 9) => {
    const config = {
        headers: { access_token: token },
        params: {
            limit,
            page,
            min,
            max,
        },
    };
    try {
        const res = await httpRequest.get(`user/hwnet/list`, config); //users
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getDetailUser = async (id, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`user/detail/${id}`, config); //detailUsers/${id}
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
