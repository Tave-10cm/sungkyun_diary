import supreme from '../assets/ootd/supreme.jpeg'
import summer from '../assets/ootd/summer.jpeg'
import sunflower1 from '../assets/ootd/sunflower1.jpeg'

const ootdExData = [
  {
    id:1,
    createdDate: new Date("2024-04-02").getTime(),
    img: supreme,
    content: "겨울철 꾸꾸꾸룩 기록"
  },
  {
    id:2,
    createdDate: new Date("2024-04-03").getTime(),
    img: summer,
    content: "여름철 스트릿 스타일링 기록"
  },
  {
    id:3,
    createdDate: new Date("2024-04-04").getTime(),
    img: sunflower1,
    content: "가을철 자켓 스타일링 기록"
  },

]

const OotdReducer = (state = ootdExData, action) =>{
    switch(action.type){
      case 'CREATE_OOTD':
        return [action.ootdData, ...state]
      case 'UPDATE_OOTD':
        return state.map((item) => String(item.id) === String(action.ootdData.id) ? action.ootdData : item);
      case 'DELETE_OOTD':
        return state.filter((item)=>String(item.id) !== String(action.id));
    }
  }

export default OotdReducer;