import Header from "../components/Header";
import Button from "../components/Buttons";
import { useContext, useState } from "react";
import { DiaryStateContext } from "../App";
import OotdList from "../components/OotdList";


const getMonthlyData = (pivotDate, data)=>{
    const beginTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth(),
        1,
        0,
        0,
        0
    ).getTime();

    const endTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth() + 1, //다음달로 설정
        0,
        23,
        59,
        59
    ).getTime();
    

    return data.filter((item)=>beginTime<=item.createdDate && item.createdDate<=endTime);
}
const Ootd = ({ootdData}) => {
    const data = ootdData; // 직접 props를 받아옴 -> 리덕스로 대체해보기
    const [pivotDate, setPivotDate] = useState(new Date());

    const monthlyData = getMonthlyData(pivotDate, data);


    
    const onIncreaseMonth = () =>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1))
    };
    const onDecreaseMonth = () =>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth()-1))
    };

    return (
        <div>
            <Header title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
             leftChild={<Button onClick={onDecreaseMonth} text={"<"}/>}
             rightChild={<Button onClick={onIncreaseMonth} text={">"}/>}
            />
            <OotdList data={monthlyData}/>
        </div>
    )

};
export default Ootd;