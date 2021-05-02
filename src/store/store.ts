import { createStore, applyMiddleware } from "redux";
import { createSelectorHook, useDispatch as _useDispatch } from "react-redux";
import { rootEpic, rootReducer } from "./root";
import { createEpicMiddleware } from "redux-observable";
import { ContractState } from "../reducers/contract";
import { Action } from "../reducers/actions";
import { UiState } from "../reducers/ui";

const epicMiddleware = createEpicMiddleware<Action, Action>();

export interface RootState {
  contract: ContractState;
  ui: UiState;
}

const store = createStore<RootState, any, any, any>(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

const _useSelector = createSelectorHook<RootState>();

export function useSelector<T>(fn: (store: RootState) => T): T {
  return fn(_useSelector((x) => x));
}

export default store;
