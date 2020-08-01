import { createStore } from "redux";
import { stateReducer } from "./reducer";
import { AppState } from "./app-state";

export default createStore(stateReducer, new AppState());