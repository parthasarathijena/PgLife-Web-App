import { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'
import Cookies from 'js-cookie';

const currentUser = Cookies.get('user');

const INITIAL_STATE = {
    user: currentUser?JSON.parse(currentUser):null,
    isFetching: false,
    error: false
};


export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )
}