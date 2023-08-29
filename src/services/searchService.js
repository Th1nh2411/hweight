import * as httpRequest from '../utils/httpRequest';

export const search = async (name, token, page = 1, limit = 10) => {
    const config = {
        headers: { access_token: token },
        params: {
            name,
            page,
            limit,
        },
    };
    try {
        const res = await httpRequest.get(`5c7f2d94-d0cf-4e2e-8c1b-54854ee3a2c5`, config);
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
