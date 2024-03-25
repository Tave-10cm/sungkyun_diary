import { useNavigate } from "react-router-dom";
import { getEmotionImage } from "../util/get-emotion-images";
import Button from "./Buttons";
import "./DiaryItem.css"
import { emotionList } from "../util/content";

const DiaryItem = ({id, emotionId, createdDate, content})=>{
    const nav = useNavigate();
    const emotionItem = emotionList.find(
        (item) => String(item.emotionId) === String(emotionId)
    );
    return (
        <div className="DiaryItem">
            <div onClick={()=>nav(`/diary/${id}`)} className={`img_section img_section_${emotionId}`}>
                <img src={getEmotionImage(emotionId)} />
            </div>
            <div onClick={()=>nav(`/diary/${id}`)} className="info_section">
                <div className="created_date">
                    {new Date(createdDate).toLocaleDateString()}
                </div>
                <div className="emotion_section">{emotionItem.emotionName}</div>
                <div className="content">{content}</div>
            </div>
            <div className="button_section">
                <Button onClick={()=>nav(`/edit/${id}`)} text={"수정하기"}/>
            </div>
        </div>
    );
};

export default DiaryItem;