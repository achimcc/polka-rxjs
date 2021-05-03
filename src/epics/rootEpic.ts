import { combineEpics } from "redux-observable";
import connectEpic from "./connect";
import deployEpic from "./deploy";
import uploadContract from "./uploadContract";
import { Action } from "../reducers/actions";
import { RootState } from "../reducers/rootReducer";

const rootEpic = combineEpics<Action, Action, RootState>(
  connectEpic,
  deployEpic,
  uploadContract
);

export default rootEpic;
