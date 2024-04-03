const mockData = [
  {
    id:1,
    createdDate: new Date("2024-04-18").getTime(),
    emotionId:1,
    content:"4월에 쓴 첫번째 일기"
  },
  {
    id:2,
    createdDate: new Date("2024-03-17").getTime(),
    emotionId:2,
    content:"3월에 쓴 두번째 일기"
  },
  {
    id:3,
    createdDate: new Date("2024-02-15").getTime(),
    emotionId:3,
    content:"2월에 쓴 일기"
  },
]
export default function DiaryReducer(state = mockData, action) { //action의 type이 cud중 해당하는 작업에 따라 state를 업데이트,
    switch(action.type){
      case 'CREATE' :
        return [action.data, ...state]
      case 'UPDATE':
        return state.map((item) => String(item.id) === String(action.data.id) ? action.data : item);
      case 'DELETE':
        return state.filter((item)=> String(item.id) !== String(action.id))
    }
  }
