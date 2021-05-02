import { combineEpics } from "redux-observable";
import connectEpic from "./connect";
import deployEpic from "./deploy";
import uploadContract from "./uploadContract";

const rootEpic = combineEpics<any>(connectEpic, deployEpic, uploadContract);

export default rootEpic;
