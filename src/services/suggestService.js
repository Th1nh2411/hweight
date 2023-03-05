import * as httpRequest from '../utils/httpRequest';

export const suggest = async (type = 'more') => {
    try {
        const res = await httpRequest.get(`users/search`, {
            params: {
                q: 'hoa',
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
