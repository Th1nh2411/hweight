import * as httpRequest from '../utils/httpRequest';

export const getRankRecipe = async (token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`de86566e-7ff1-42d1-b07f-d6b50bf60e1e`, config); //recipe/${day}
        return res.data; //only res
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
        const res = await httpRequest.get(`8c444728-a8da-4bbb-881e-408ed6c3bc34`, config); //recipe/${day}
        return res.data; //only res
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
        const res = await httpRequest.get(`25cd5c19-11f0-4d49-904e-c1c5e02e36b1`, config); //users
        return res.data;
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
