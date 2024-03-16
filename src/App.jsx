import {Route, Routes} from 'react-router-dom';
import Home from './routes/Home';
import Diary from './routes/Diary';
import New from './routes/New';
import Notfound from './routes/Notfound';

import Edit from './routes/Edit';
import { createContext, useReducer, useRef } from 'react';
import Login from './routes/Login';
import CreateAccount from './routes/CreateAccount';


function reducer(state, action){
  switch(action.type){
    case 'CREATE' :
      return [action.data, ...state]
    case 'UPDATE':
      return state.map((item) => String(item.id) === String(action.data.id) ? action.data : item);
    case 'DELETE':
      return state.filter((item)=> String(item.id) !== String(action.id))
  }
}
const DiaryStateContext = createContext();
const DiaryDispatchContext = createContext();

function App() {

  const idRef = useRef();
  const [data, dispatch] = useReducer(reducer, []);
  const onCreate = (createDate, emotionId, content) =>{
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    })
  }
  const onUpdate = (id, createDate, emotionId, content) =>{
      dispatch({
        type:"UPDATE",
        data: {
          id, createDate, emotionId, content,
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
           <Route path='createAccount' element={<CreateAccount />} />             <Route path='/new' element={<New/>} />
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
