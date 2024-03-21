import { useContext, useState, useEffect} from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) =>{
    const data = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState();
    const nav = useNavigate();

    useEffect(()=>{
        const currentDiaryItem = data.find(
          (item)=>String(item.id)===String(id)) //모든 일기 아이템중 params의 id값과 일치하는 값을 반환
      
        if(!currentDiaryItem){
          window.alert("존재하지 않는 일기입니다.")
          nav("/home", {replace: true});
        }
        setCurDiaryItem(currentDiaryItem);
  
      }, [id, data]); //params의 id나 data가 바뀌었을 경우..
  return curDiaryItem;
};

export default useDiary;