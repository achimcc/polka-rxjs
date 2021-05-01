import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import contractReducer from "../reducers/contract";
import uiReducer from "../reducers/ui";
import { connect } from "../epics/connect";
import { deploy } from "../epics/deploy";
import { uploadContract } from "../epics/uploadContract";
import { Action } from "../reducers/actions";

export const rootReducer = combineReducers({
  contract: contractReducer,
  ui: uiReducer,
});

export const rootEpic = combineEpics<Action, Action>(
  connect,
  deploy,
  uploadContract
);
