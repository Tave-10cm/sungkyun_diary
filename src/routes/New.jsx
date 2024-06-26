import { useNavigate } from "react-router-dom";
import Button from "../components/Buttons";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

export default function New(){
    const {onCreate} = useContext(DiaryDispatchContext);
    const nav = useNavigate();
    const onSubmit = (input) => {
      onCreate(
        input.createdDate.getTime(),
        input.emotionId,
        input.imgSrc,
        input.content);
      nav('/home', {replace: true});
    };
    return (
        <div>
            <Header 
              title={"새 일기 쓰기"}
              leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"}/>}
            />
            <Editor onSubmit={onSubmit}/>
        </div>
    )
}