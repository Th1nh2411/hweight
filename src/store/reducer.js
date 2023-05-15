import { SET_USERINFO } from './constraints';

function reducer(state, action) {
    switch (action.type) {
        case SET_USERINFO:
            return { ...state, userinfo: action.payload };
        default:
            return state;
    }
}
export default reducer;
