import { createStore, applyMiddleware } from "redux";
import { rootEpic, rootReducer } from "./root";
import { createEpicMiddleware } from "redux-observable";
import { ContractState } from "../reducers/contract";
import { Action } from "../reducers/actions";
import { UiState } from "../reducers/ui";
import { configureStore } from "@reduxjs/toolkit";

const epicMiddleware = createEpicMiddleware<Action, Action>();

export interface RootState {
  contract: ContractState;
  ui: UiState;
}
/*
const store = createStore<RootState, any, any, any>(
  rootReducer,
  applyMiddleware(epicMiddleware)
);
*/

const store = configureStore({
  reducer: rootReducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);

export default store;
