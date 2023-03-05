import * as httpRequest from '../utils/httpRequest';

export const following = async (type = 'more') => {
    try {
        const res = await httpRequest.get(`users/search`, {
            params: {
                q: 'b',
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
