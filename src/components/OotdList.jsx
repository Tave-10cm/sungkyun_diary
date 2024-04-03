import { useNavigate } from "react-router-dom";
import Button from "./Buttons";
import "./OotdList.css";
import { useState } from "react";
import OotdItem from "./OotdItem";
import Weather from "./Weather";

const OotdList = ({data}) =>{
    const nav = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const onChangeSortType = (e) =>{
        setSortType(e.target.value);
    }
    const getSortedData = () =>{
        return data.toSorted((a, b)=>{
           if(sortType === "oldest") {
            return Number(a.createdDate) - Number(b.createdDate)
           } else{
            return Number(b.createdDate) - Number(a.createdDate)
           }
        });
    };

    const sortedData = getSortedData();

    return (
        <div className="OotdList">
            <div className="menu_bar">
                <select onChange={onChangeSortType}>
                  <option value={"latest"}>최신순</option>
                  <option value={"oldest"}>오래된 순</option>
                </select>
                <Button onClick={()=>nav("/newOotd")} text={"ootd 작성"} type={"POSITIVE"}/>
                <Button onClick={() => nav("/home")} text={"일기 페이지로 가기"} type={"POSITIVE"}/>
                
            </div>

            <div className="weather_clothes">
                <Weather />
            </div>

            <div className="list_wrapper">
                {sortedData.map((item)=><OotdItem key={item.id} {...item}/>)}
            </div>
        </div>
    )
};

export default OotdList;