import {Route, Routes} from 'react-router-dom';
import Home from './routes/Home';
import Diary from './routes/Diary';
import New from './routes/New';
import Notfound from './routes/Notfound';

import Edit from './routes/Edit';
import { createContext, useReducer, useRef } from 'react';
import Login from './routes/Login';
import CreateAccount from './routes/CreateAccount';

const mockData = [
  {
    id:1,
    createdDate: new Date("2024-03-18").getTime(),
    emotionId:1,
    content:"3월에 쓴 첫번째 일기"
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

function App() {

  const idRef = useRef();
  const [data, dispatch] = useReducer(reducer, mockData);
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
      type: "UPDATE",
      data:{
        id,
      }
    })
  }
  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{
          onCreate,
          onUpdate,
          onDelete,
          }}
        >
         <Routes>
           <Route path='/' element={<Login />} />
           <Route path='createAccount' element={<CreateAccount />} /> 
           <Route path='/new' element={<New/>} />
           <Route path='/diary/:id' element={<Diary/>} />
           <Route path='/edit/:id' element={<Edit />} />
           <Route path='/home' element={<Home />} />
           <Route path='*' element={<Notfound/>} />
        </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>

    </>
  )
}

export default App
