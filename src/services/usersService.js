import * as httpRequest from '../utils/httpRequest';

export const getUsers = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`https://mocki.io/v1/e53ea8b6-23b9-4fe1-96d3-c91cd44cf252`, config); //users
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getDetailUser = async (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    try {
        const res = await httpRequest.get(`https://mocki.io/v1/df9f697c-a214-4d85-b4e8-9e6bd0ec4091`, config); //detailUsers/${id}
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
