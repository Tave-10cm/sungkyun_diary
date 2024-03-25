import { Link } from "react-router-dom";
import { Form, Input, Switcher, Title, Wrapper } from "../style/auth-components"

const CreateAccount = () =>{
    return <Wrapper>
        <Title>회원가입</Title>
        <Form>
            <Input name="name" placeholder="Name" type="text" required/>
            <Input name="email" placeholder="Email" type="email" required/>
            <Input name="password" placeholder="Password" type="password" required/>
            <Input type="submit"/>
        </Form>
        <Switcher>이미 계정이 있으신가요? <Link to="/">로그인 하러가기 &rarr;</Link></Switcher>
    </Wrapper>
};

export default CreateAccount;