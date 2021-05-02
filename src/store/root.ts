import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import contractReducer from "../reducers/contract";
import uiReducer from "../reducers/ui";
import connectEpic from "../epics/connect";
import deployEpic from "../epics/deploy";
import uploadContract from "../epics/uploadContract";

export const rootReducer = combineReducers({
  contract: contractReducer,
  ui: uiReducer,
});

export const rootEpic = combineEpics<any>(
  connectEpic,
  deployEpic,
  uploadContract
);
