import { useNavigate } from "react-router-dom";
import Button from "../components/Buttons";
import Header from "../components/Header";
import { useContext, useState } from "react";
import { DiaryDispatchContext } from "../App";
import './NewOotd.css';

const NewOotd = () => {
    const nav = useNavigate();
    const {createOotd} = useContext(DiaryDispatchContext);


    const [date, setDate] = useState("");
    const [conetent, setContent] = useState("");
    const [imgSrc, setImgSrc] = useState(null);

    const onChangeDate = (e) => {
        let value = e.target.value;
        value = new Date(value);
        setDate(value)
    }
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onUpload = (e) =>{
        const reader = new FileReader();
  
        reader.onload = function(e) {
            setImgSrc(e.target.result || null);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const onClearImg = () =>{
      setImgSrc("");
    };
    const onClickSubmitButton = () => {
        createOotd(date, imgSrc, conetent);
        nav('/ootd');
    }

    return(
        <div className="newOotd_wrapper">
            <Header 
              title={"새 ootd 작성"}
              leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"}/>}
            />
            <section className="date_section">
                <h4>날짜를 입력하세요</h4>
                <input type="date" value={date} onChange={onChangeDate} />
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
                <h4>오늘의 스타일을 설명해주세요</h4>
                <textarea
                  value={conetent}
                  onChange={onChangeContent}
                  placeholder="소개"
                  name="content"
                />
              </section>

              <section className="button_section">
                <Button
                  onClick={onClickSubmitButton} 
                  text={"작성완료"}
                  type={"POSITIVE"}/>
              </section>
        </div>
    )
}

export default NewOotd;