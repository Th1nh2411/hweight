import * as httpRequest from '../utils/httpRequest';

export const getRecipe = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`recipe`, config);
        return res.data;
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
export const postRecipe = async (data, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.post(`recipe`, data);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateRecipe = async (data, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.put(`recipe`, { data });
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
