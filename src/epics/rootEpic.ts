import { combineEpics } from "redux-observable";
import connectEpic from "./connect";
import deployEpic from "./deploy";
import uploadContract from "./uploadContract";
import { Action } from "../reducers/actions";

const rootEpic = combineEpics<Action, Action>(
  connectEpic,
  deployEpic,
  uploadContract
);

export default rootEpic;
