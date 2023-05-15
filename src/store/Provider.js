import { useReducer } from 'react';
import UserContext from './Context';
import reducer from './reducer';

function Provider({ children }) {
    const initState = { userinfo: { name: 'Thinh' } };
    const [state, dispatch] = useReducer(reducer, initState);
    return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
}

export default Provider;
