import { Link } from "react-router-dom";
import { Input, Switcher, Title, Wrapper, Form } from "../style/auth-components"
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";



export default function login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {error, isPending, login} = useLogin();

    const handleData = (e) => {
        if(e.target.type === "email"){
          setEmail(e.target.value);
        } else if(e.target.type === "password"){
          setPassword(e.target.value);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        login(email, password);
    }



    return (
        <Wrapper>
            <Title>📔로그인</Title>

            <Form onSubmit={handleSubmit}>
                <Input  name="email" placeholder="email" type="email" value={email} onChange={handleData} required/>
                <Input name="password"  placeholder="Password" type="password" value={password} onChange={handleData} required/>
                {!isPending && <Input type="submit" />}
                {isPending && <strong>로그인 진행중입니다...</strong>}
                {error && <strong>{error}</strong>}
            </Form>
        
            <Switcher>계정이 없으신가요? <Link to="/createAccount">계정 생성하기 &rarr;</Link></Switcher>
        </Wrapper>
    )
}

