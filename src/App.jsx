import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './routes/Home';
import Diary from './routes/Diary';
import New from './routes/New';
import Notfound from './routes/Notfound';
import supreme from './assets/ootd/supreme.jpeg'
import summer from './assets/ootd/summer.jpeg'
import sunflower1 from './assets/ootd/sunflower1.jpeg'
import Edit from './routes/Edit';
import { createContext, useReducer, useRef, useState } from 'react';
import Login from './routes/Login';
import CreateAccount from './routes/CreateAccount';
import Ootd from './routes/Ootd';
import NewOotd from './routes/NewOotd';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootReducers from './reducers/RootReducer';
import { useAuthContext } from './hooks/useAuthContext';

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


function reducer(state, action){ //action의 type이 cud중 해당하는 작업에 따라 state를 업데이트,
  switch(action.type){
    case 'CREATE' :
      return [action.data, ...state]
    case 'UPDATE':
      return state.map((item) => String(item.id) === String(action.data.id) ? action.data : item);
    case 'DELETE':
      return state.filter((item)=> String(item.id) !== String(action.id))
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();
// ----------ootd context------------
export const OotdStateContext = createContext();

function App() {

  const idRef = useRef();
  const [data, dispatch] = useReducer(reducer, mockData);
  
  const ootdIdRef = useRef(4);
  const [ootdData, setOotdData] = useState(ootdExData);

  const createOotd = (createdDate, img, content) => {
    const newOotd = {
      id: ootdIdRef.current,
      createdDate,
      img,
      content,
    }
    ootdIdRef.current++;
    setOotdData([newOotd, ...ootdData])
    console.log(ootdData);
  }


  // 일기장 crud기능 함수
  const onCreate = (createdDate, emotionId, content) =>{
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    })
  }
  const onUpdate = (id, createdDate, emotionId, content) =>{
      dispatch({
        type:"UPDATE",
        data: {
          id, createdDate, emotionId, content,
        },
      })
  }
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      data:{
        id,
      }
    })
  }

  const {isAuthReady, user} = useAuthContext();

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{
          onCreate,
          onUpdate,
          onDelete,
          createOotd,
          }}
        >
         <Routes>
           <Route path='/' element={!user ? <Login /> : <Navigate replace={true} to="/home"/>} />
           <Route path='createAccount' element={!user ? <CreateAccount /> : <Navigate replace={true} to="/home"/>} /> 
           <Route path='/new' element={<New/>} />
           <Route path='/diary/:id' element={<Diary/>} />
           <Route path='/edit/:id' element={<Edit />} />
           <Route path='/home' element={user ? <Home/> : <Navigate replace={true} to="/"/>}/>
           <Route path='/Ootd' element={<Ootd ootdData={ootdData}/>}/>
           <Route path='/newOotd' element={<NewOotd onCreateOotd={createOotd}/>}/>
           <Route path='*' element={<Notfound/>} />
        </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>

    </>
  )
}

export default App