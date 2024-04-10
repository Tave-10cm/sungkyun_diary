import { signOut } from "firebase/auth";
import { useState } from "react"
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIspending] = useState(false);
    const {dispatch} = useAuthContext();


    const logout = () => {
        setError(null);
        setIspending(true);

        signOut(appAuth).then(() =>{
            // 로그아웃 성공
            dispatch({type : 'logout'});
            setError(null);
            isPending(false);
        }).catch((error)=>{
            // 로그아웃 실패
            setError(error.message);
            setIspending(false);
        });
    }
    return {error, isPending, logout}
}