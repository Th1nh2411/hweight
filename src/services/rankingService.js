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
