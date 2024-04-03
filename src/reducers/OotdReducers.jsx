
const OotdReducer = (state, action) =>{
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