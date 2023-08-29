import * as httpRequest from '../utils/httpRequest';

export const getHistory = async (date, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`109d193c-35c8-4224-9ea6-107c079538ea`, config); //profile
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getAllHistory = async (token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`326eacc1-c10b-4cbe-a134-7c52fd476dd7`, config); //profile
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateWaterIntake = async (date, data, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.put(`user/edit/history/${date}`, data, config); //profile
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getProfile = async (token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`ded93f42-7bbb-42b0-a256-351e02ec8f7b`, config); //profile
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const updateProfile = async (data, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.put(`user/edit/detail`, data, config); //profile
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const changePassword = async (data, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.put(`account/changepassword`, data, config); //profile
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
