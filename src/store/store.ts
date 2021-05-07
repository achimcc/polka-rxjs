import { createStore, applyMiddleware } from "redux";
import { createSelectorHook } from "react-redux";
import rootReducer from "../reducers/rootReducer";
import { RootState } from "../reducers/rootReducer";
import rootEpic from "../epics/rootEpic";
import { createEpicMiddleware } from "redux-observable";
import { Action } from "../reducers/actions";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

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

export function useSelector<T>(fn: (store: RootState) => T): T {
  return fn(_useSelector((x) => x));
}

export { store, persistor };
