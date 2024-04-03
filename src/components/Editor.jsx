import { useEffect, useState } from "react";
import Button from "./Buttons";
import "./Editor.css";
import EmotionItem from "./EmotionItem";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/content";
import { getStringDate } from "../util/get-stringed-date";
import Weather from "./Weather";




const Editor = ({initData, onSubmit}) =>{
  const [input, setInput] = useState({
    createdDate : new Date(),
    emotionId : 3,
    content : "",
  });
  const nav = useNavigate();

  useEffect(()=>{
    if(initData){
      setInput({
        ...initData,
        createdDate : new Date(Number(initData.createdDate)),
      })
    }
  }, [initData])
  
  const onChangeInput = (e) =>{

    let name = e.target.name;
    let value = e.target.value;

    if(name === "createdDate"){
      value = new Date(value); //문자열이 저장되지 않게 하기위해
    }

    setInput({
      ...input,
      [name] : value,
    });
  };
  const onClickSubmitButton = () =>{
    onSubmit(input);
  }
  //img upload
  const [imgSrc, setImgSrc] = useState(null);
  const onUpload = (e) =>{
      const reader = new FileReader();

      reader.onload = function(e) {
          setImgSrc(e.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);
  }
  const onClearImg = () =>{
    setImgSrc("");
  };
  

    return (
        <div className="Editor">
          <section className="date_section">
            <h4>오늘의 날짜</h4>
              <input 
              name="createdDate"
              onChange={onChangeInput}
              value={getStringDate(input.createdDate)}
              type="date"/>
          </section>

          <section className="weather_section">
            <h4>오늘의 날씨</h4>
            <Weather />
          </section>

          <section className="emotion_section">
            <h4>오늘의 감정</h4>
            <div className="emotion_list_wrapper">
              {emotionList.map((item)=>
              <EmotionItem
                onClick={()=>onChangeInput({
                  target : {
                    name:"emotionId",
                    value: item.emotionId,
                  },
                })}
                key={item.emotionId}
                {...item}
                isSelected={item.emotionId === input.emotionId} />)}
            </div>
          </section>

          <section className="img_section">
            <h4>사진을 업로드</h4>
            <div className="img_wrapper">
              <div className="Img">
                <input
                  className="imgInputArea"
                  type="file"
                  accept="image/*"
                  onChange={e => onUpload(e)}
                />
                <img 
                  className="imgPreview"
                  alt="사진"
                  src={imgSrc}
                />               
                </div>
                <button onClick={onClearImg}>clear</button>
              </div>
              
          </section>

          <section className="content_section">
            <h4>오늘의 일기</h4>
            <textarea 
              name="content"
              value={input.content}
              onChange={onChangeInput}
              placeholder="오늘은 어땠나요?" />
          </section>
          <section className="button_section">
            <Button
              onClick={()=>nav(-1)}
              text={"취소하기"}/>
            <Button
              onClick={onClickSubmitButton} 
              text={"작성완료"}
              type={"POSITIVE"}/>
          </section>
        </div>
    );
};

export default Editor;