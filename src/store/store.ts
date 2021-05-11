import { createStore, applyMiddleware } from "redux";
import { createSelectorHook, useDispatch as _useDispatch } from "react-redux";
import { createEpicMiddleware } from "redux-observable";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { RootState } from "./rootReducer";
import rootEpic from "./rootEpic";
import { Action } from "../reducers/actions";

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(epicMiddleware));
const persistor = persistStore(store);

epicMiddleware.run(rootEpic);

const _useSelector = createSelectorHook<RootState>();

function useSelector<T>(fn: (store: RootState) => T): T {
  return fn(_useSelector((x) => x));
}

function useDispatch(): (args: Action) => Action {
  const dispatch = _useDispatch();
  return (action: Action) => dispatch(action);
}

export { store, persistor, useSelector, useDispatch };
