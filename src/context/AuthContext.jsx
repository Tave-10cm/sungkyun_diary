import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useReducer } from 'react';
import { appAuth } from '../firebase/config';

// context를 객체를 생성합니다.
const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {...state, user : action.payload}
        case 'logout':
            return {...state, user : null}
        case 'isAuthReady':
            return {...state, user: action.payload, isAuthReady: true}
        default:
            return state
    }
}


// context를 객체를 구독할 컴포넌트의 묶음 범위를 설정합니다.
const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthReady: false
    })

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(appAuth, (user)=>{
            dispatch({type: 'isAuthReady', payload: user});  
        })
        return unsubscribe
    }, [])

    return (
				// { ...state, dispatch } 이 두 가지 값이 context객체를 통해 접근할 수 있는 값이 됩니다.
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };