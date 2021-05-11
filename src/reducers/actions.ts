import { ApiRx } from "@polkadot/api";
import { AnyJson, ISubmittableResult } from "@polkadot/types/types";
import { Action as DefaultAction } from "redux";
import { useDispatch as _useDispatch } from "react-redux";
import { ContractStatus, UIMessage } from "../types";

interface BaseAction extends DefaultAction<string> {
  type: string;
  payload?: object;
}

interface UploadContract extends BaseAction {
  type: "UploadContract";
  payload: { file: File };
}

interface UploadContractSuccess extends BaseAction {
  type: "UploadContractSuccess";
  payload: {
    wasm: Uint8Array;
    name: string;
    methods: Array<string>;
    hash: string;
    json: AnyJson;
  };
}

interface Deploy extends BaseAction {
  type: "Deploy";
  payload: { gas: string; endowment: string };
}

interface DeployMessage extends BaseAction {
  type: "DeployMessage";
  payload: {
    result: ISubmittableResult;
    status: ContractStatus;
  };
}
interface Connect extends BaseAction {
  type: "Connect";
  payload: { url: string };
}

interface Connected extends BaseAction {
  type: "Connected";
  payload: { api: ApiRx };
}

interface Disconnect extends BaseAction {
  type: "Disconnect";
}

interface Disconnected extends BaseAction {
  type: "Disconnected";
}

interface UploadWasmSuccess extends BaseAction {
  type: "UploadWasmSuccess";
  payload: { wasm: Uint8Array };
}

interface CancelDeploy extends BaseAction {
  type: "CancelDeploy";
}

interface CallResult extends BaseAction {
  type: "CallResult";
  payload: { message: UIMessage };
}

interface Call extends BaseAction {
  type: "Call";
  payload: { address: string; method: string };
}

interface CallRpc extends BaseAction {
  type: "CallRpc";
  payload: { address: string; method: string };
}

interface ClearCallResults extends BaseAction {
  type: "ClearCallResults";
}

interface ForgetContract extends BaseAction {
  type: "ForgetContract";
  payload: { id: string };
}

interface ForgetInstance extends BaseAction {
  type: "ForgetInstance";
  payload: { address: string };
}

interface Instantiate extends BaseAction {
  type: "Instantiate";
  payload: { gas: string; endowment: string; id: string };
}

interface StartInstantiate extends BaseAction {
  type: "StartInstantiate";
}

type AllActions =
  | UploadContract
  | UploadContractSuccess
  | Deploy
  | DeployMessage
  | Connect
  | Connected
  | UploadWasmSuccess
  | CancelDeploy
  | Call
  | CallRpc
  | CallResult
  | ClearCallResults
  | ForgetContract
  | ForgetInstance
  | Instantiate
  | Disconnect
  | Disconnected
  | StartInstantiate;

type ActionTypes = AllActions["type"];

export type Action<T extends ActionTypes = ActionTypes> = AllActions & {
  type: T;
};

export function isType<P extends ActionTypes>(type: P) {
  return (action: Action): action is Action<P> => action.type === type;
}
