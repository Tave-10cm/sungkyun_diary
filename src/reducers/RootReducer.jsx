import { combineReducers } from "redux";
import DiaryReducer from "./DiaryReducer";
import OotdReducer from "./OotdReducers";

const RootReducers = combineReducers({
    DiaryReducer,
    OotdReducer
})

export default RootReducers;