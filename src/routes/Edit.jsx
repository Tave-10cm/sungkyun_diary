import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Buttons";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary";


const Edit = () =>{
    const params = useParams();
    const nav = useNavigate();
    const {onDelete, onUpdate} = useContext(DiaryDispatchContext);
    const curDiaryItem = useDiary(params.id);

    const onCLickDelete = () =>{
      if(
        window.confirm("일기를 정말 삭제할까요? 복구되지 않습니다!")
      ){
        onDelete(params.id);
        nav('/home', {replace: true});
      }
    };

    const onSubmit = (input) =>{
      if(window.confirm("일기를 수정할까요?")){
        onUpdate(
          params.id,
          input.createdDate.getTime(),
          input.emotionId,
          input.imgSrc,
          input.content
        );
        nav("/home", {replace : true});
      }
      
    };
    return (
        <div>
            <Header 
              title={"일기 수정하기" }
              leftChild={<Button onClick={()=>nav(-1)} text={"< 뒤로가기"}/>}
              rightChild={
                <Button
                  onClick={onCLickDelete}
                  text={"삭제하기"}
                  type={"NEGATIVE"}/>}
            />
            <Editor initData = {curDiaryItem} onSubmit={onSubmit}/>

        </div>
    )
}

export default Edit;