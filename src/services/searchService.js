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
        const res = await httpRequest.get(`recipe/search`, config);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
