import { combineEpics } from "redux-observable";
import connect from "./connect";
import deploy from "./deploy";
import upload from "./uploadContract";
import call from "./call";
import callRpc from "./callRpc";
import { Action } from "../reducers/actions";
import { RootState } from "../reducers/rootReducer";

const rootEpic = combineEpics<Action, Action, RootState>(
  connect,
  deploy,
  upload,
  call,
  callRpc
);

export default rootEpic;
