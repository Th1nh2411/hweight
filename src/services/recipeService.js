import * as httpRequest from '../utils/httpRequest';

export const getRecipe = async (day, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`user/menu/${day}`, config); //recipe/${day}
        return res; //only res
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
        const res = await httpRequest.put(`user/menu/edit/${day}`, { data });
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
        const res = await httpRequest.get(`recipe/info/${id}`, config); //menu/${id}
        return res;
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
        const res = await httpRequest.get(`recipe/all/filter`, config); //menu
        return res;
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
        const res = await httpRequest.get(`recipe/cmt`, config); //menu
        return res;
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
export const updateMenuItem = async (id, data, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.patch(`menu/${id}`, data);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateRecipesItem = async (day, id, data, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.patch(`recipe/${day}/${id}`, data);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
