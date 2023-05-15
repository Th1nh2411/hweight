import * as httpRequest from '../utils/httpRequest';

export const mailForgot = async (param = {}) => {
    try {
        const res = await httpRequest.post(`account/forgotpassword`, param); //account
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const verifyOTP = async (param = {}) => {
    try {
        const res = await httpRequest.post(`account/forgotpassword/verify`, param); //account
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const changePw = async (param = {}) => {
    try {
        const res = await httpRequest.post(`account/forgotpassword/verify/success`, param); //account
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
