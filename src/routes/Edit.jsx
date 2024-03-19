import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Buttons";
import Editor from "../components/Editor";
import { useContext } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () =>{
    const params = useParams();
    const nav = useNavigate();
    const {onDelete} = useContext(DiaryDispatchContext);
    const data = useContext(DiaryStateContext);

    const onCLickDelete = () =>{
      if(
        window.confirm("일기를 정말 삭제할까요? 복구되지 않습니다!")
      ){
        onDelete(params.id);
        nav('/home', {replace: true});
      }
    };

    const getCurrentDiaryItem = () =>{
        const currentDiaryItem = data.find(
            (item)=>String(item.id)===String(params.id)) //모든 일기 아이템중 params의 id값과 일치하는 값을 반환
        
        if(!currentDiaryItem){
            window.alert("존재하지 않는 일기입니다.")
            nav("/home", {replace: true});
        }
        return currentDiaryItem;
    };
    const currentDiaryItem = getCurrentDiaryItem();

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
            <Editor />

        </div>
    )
}

export default Edit;