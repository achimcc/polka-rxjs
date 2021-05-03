import { createStore, applyMiddleware } from "redux";
import { createSelectorHook } from "react-redux";
import rootReducer from "../reducers/rootReducer";
import { RootState } from "../reducers/rootReducer";
import rootEpic from "../epics/rootEpic";
import { createEpicMiddleware } from "redux-observable";
import { Action } from "../reducers/actions";

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

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
