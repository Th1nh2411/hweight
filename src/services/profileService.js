import * as httpRequest from '../utils/httpRequest';

export const getProfile = async (token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`user/detail`, config); //profile
        return res;
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
export const getHistory = async (date, token) => {
    const config = {
        headers: { access_token: token },
    };
    try {
        const res = await httpRequest.get(`user/history/${date}`, config); //profile
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
