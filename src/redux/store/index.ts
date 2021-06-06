import { createStore, applyMiddleware } from "redux";
import { createSelectorHook, useDispatch as _useDispatch } from "react-redux";
import { createEpicMiddleware } from "redux-observable";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer, { RootState } from "../reducers";
import rootEpic from "../epics";

const epicMiddleware = createEpicMiddleware<any, any, RootState>();

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer<any>(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(epicMiddleware));
const persistor = persistStore(store);

epicMiddleware.run(rootEpic);

const _useSelector = createSelectorHook<RootState>();

function useSelector<T>(fn: (store: RootState) => T): T {
  return fn(_useSelector((x) => x));
}

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];

const useDispatch = () => _useDispatch<AppDispatch>();

export { store, persistor, useSelector, useDispatch };
