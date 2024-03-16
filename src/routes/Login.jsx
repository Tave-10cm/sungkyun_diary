import { Link } from "react-router-dom";
import { Input, Switcher, Title, Wrapper, Form } from "../components/auth-components"



const Login = () =>{
    return <Wrapper>
    <Title>로그인</Title>

    <Form>
        <Input  name="email" placeholder="email" type="email" required/>
        <Input name="password"  placeholder="Password" type="password" required/>
        <Input type="submit" />
    </Form>
   
    <Switcher>계정이 없으신가요? <Link to="/createAccount">계정 생성하기 &rarr;</Link></Switcher>
</Wrapper>
};

export default Login;