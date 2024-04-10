import { Link } from "react-router-dom";
import { Form, Input, Switcher, Title, Wrapper } from "../style/auth-components"
import { useState } from "react";
import { useCreateAccount } from "../hooks/useCreateAccount";

export default function CreateAccount(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const {error, isPending, signup} = useCreateAccount();


    const handleData = (e) =>{
        if(e.target.type === "email"){
            setEmail(e.target.value);
        } else if (e.target.type === "password"){
            setPassword(e.target.value);
        } else if (e.target.type === "text"){
            setDisplayName(e.target.value);
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        signup(email, password, displayName);
    }

    return <Wrapper>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
            <Input name="name" placeholder="Name" type="text" onChange={handleData} value={displayName} required/>
            <Input name="email" placeholder="Email" type="email" onChange={handleData} value={email} required/>
            <Input name="password" placeholder="Password" type="password" onChange={handleData} value={password} required/>
            <Input type="submit"/>
        </Form>
        {error && <strong>{error}</strong>}
        <Switcher>이미 계정이 있으신가요? <Link to="/">로그인 하러가기 &rarr;</Link></Switcher>
    </Wrapper>
}
