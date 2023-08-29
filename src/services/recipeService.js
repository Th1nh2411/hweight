import * as httpRequest from '../utils/httpRequest';

export const getRecipe = async (day, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`4e93ac25-5ce0-4a4a-98ff-e2d53a17c51e`, config); //recipe/${day}
        return res.data; //only res
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateRecipes = async (data, day, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.put(`user/menu/edit/${day}`, data, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getDetailRecipe = async (id, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`73f981f0-1ba4-4f2a-ad4f-8453c7ce5282`, config); //menu/${id}
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getMenu = async (token, ingredient = '0', calories = '100,500', page = 1, limit = 10) => {
    const config = {
        headers: { access_token: token },
        params: {
            ingredient,
            calories,
            limit,
            page,
        },
    };
    try {
        const res = await httpRequest.get(`5c7f2d94-d0cf-4e2e-8c1b-54854ee3a2c5`, config); //menu
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getIngredients = async (token, page = 1, limit = 5) => {
    const config = {
        headers: { access_token: token },
        params: {
            limit,
            page,
        },
    };
    try {
        const res = await httpRequest.get(`d3189d8f-3d76-454a-a080-847508cd36db`, config); //ingredients
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getComment = async (idRecipe, token, page = 1, limit = 5) => {
    const config = {
        headers: { access_token: token },
        params: {
            idRecipe,
            limit,
            page,
        },
    };
    try {
        const res = await httpRequest.get(`345caaf8-0e0c-4847-9dd9-d05a3c0a0286`, config); //menu
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const postComment = async (idRecipe, cmt, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.put(`recipe/cmt/${idRecipe}`, { cmt }, config); //menu
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateLikedRecipe = async (idRecipe, isLiked, token) => {
    const config = {
        headers: { access_token: token },
        params: {
            idRecipe,
            isLike: isLiked ? 1 : 0,
        },
    };
    try {
        const res = await httpRequest.put(`recipe/like`, {}, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
