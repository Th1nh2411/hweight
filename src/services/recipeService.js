import * as httpRequest from '../utils/httpRequest';

export const getRecipe = async (day, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`https://mocki.io/v1/80a5215f-a1aa-44cb-9707-3b1cb6e4e487`, config); //recipe/${day}
        return res; //only res
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
        const res = await httpRequest.get(`https://mocki.io/v1/13b08abb-3c38-4160-92fd-57203324c825`, config); //menu/${id}
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
        const res = await httpRequest.get(`https://mocki.io/v1/0ca63472-d3fe-4611-bf4a-30903ce91d3e`, config); //menu
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
