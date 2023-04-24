import * as httpRequest from '../utils/httpRequest';

export const getRecipe = async (day, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`recipe/${day}`, config);
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getDetailRecipe = async (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`menu/${id}`, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getMenu = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`menu`, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const deleteRecipe = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.del(`recipe`);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateMenuItem = async (id, data, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.patch(`recipe/${day}/${id}`, data);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateRecipes = async (data, day, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.put(`recipe/${day}`, { data });
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
