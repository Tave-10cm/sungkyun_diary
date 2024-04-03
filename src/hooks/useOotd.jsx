import { useContext, useState, useEffect} from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useOotd = (id) =>{
    const data = useContext(DiaryStateContext);
    const [curItem, setCurItem] = useState();
    const nav = useNavigate();

    useEffect(()=>{
        const currentItem = data.find(
          (item)=>String(item.id)===String(id)) //모든 일기 아이템중 params의 id값과 일치하는 값을 반환
      
        if(!currentItem){
          window.alert("존재하지 않는 ootd입니다.")
          nav("/home", {replace: true});
        }
        setCurItem(currentItem);
  
      }, [id, data]); //params의 id나 data가 바뀌었을 경우..
  return curItem;
};

export default useOotd;