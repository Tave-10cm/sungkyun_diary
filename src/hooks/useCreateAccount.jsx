import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react"
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useCreateAccount = () =>{
    //에러 정보를 저장
    const [error, setError] = useState(null);
    // 현재 서버와 통신 상태를 저장
    const [isPending, setIspending] = useState(false);
    const {dispatch} = useAuthContext();

    const signup =(email, password, displayName) => {
        setError(null); //아직 에러가 없다.
        setIspending(true); //통신을 진행중
        //비밀번호 기반 계정 만들기(파이어베이스 기능)
        createUserWithEmailAndPassword(appAuth, email, password)
          .then((userCredential) =>{
            const user = userCredential.user;
            console.log(user);

            if (!user){
                throw new Error('회원가입에 실패했습니다.')
            }
            updateProfile(appAuth.currentUser, {displayName})
                .then(() =>{
                    dispatch({type: 'login', playload: user});
                    setError(null);
                    setIspending(false);
                }).catch((err)=>{
                    setError(err.message);
                    setIspending(false);
                })

          }).catch((err)=>{
            setError(err.message);
            setIspending(false);
          }) 
    }
    return{error, isPending, signup}

}