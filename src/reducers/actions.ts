import { ApiRx } from "@polkadot/api";
import { AnyJson, ISubmittableResult } from "@polkadot/types/types";
import { Action as DefaultAction } from "redux";
import { useDispatch as _useDispatch } from "react-redux";
import { ContractStatus, UIMessage } from "../types";

type ActionType =
  | "Connect"
  | "Connected"
  | "Disconnect"
  | "Disconnected"
  | "Deploy"
  | "UploadContract"
  | "UploadContractSuccess"
  | "ForgetContract"
  | "DeployMessage"
  | "UploadWasmSuccess"
  | "CancelDeploy"
  | "Call"
  | "CallRpc"
  | "CallResult"
  | "Instantiate"
  | "StartInstantiate";

interface BaseAction extends DefaultAction<ActionType> {
  type: ActionType;
  payload?: object | number | string;
}

interface UploadContract extends BaseAction {
  type: "UploadContract";
  payload: File;
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
  payload: ApiRx;
}

interface Disconnect extends BaseAction {
  type: "Disconnect";
}

interface Disconnected extends BaseAction {
  type: "Disconnected";
}

interface UploadWasmSuccess extends BaseAction {
  type: "UploadWasmSuccess";
  payload: Uint8Array;
}

interface CancelDeploy extends BaseAction {
  type: "CancelDeploy";
}

interface CallResult extends BaseAction {
  type: "CallResult";
  payload: UIMessage;
}

interface Call extends BaseAction {
  type: "Call";
  payload: { address: string; method: string };
}

interface CallRpc extends BaseAction {
  type: "CallRpc";
  payload: { address: string; method: string };
}

interface ForgetContract extends BaseAction {
  type: "ForgetContract";
  payload: { id: string };
}

interface Instantiate extends BaseAction {
  type: "Instantiate";
  payload: { gas: string; endowment: string; id: string };
}

interface StartInstantiate extends BaseAction {
  type: "StartInstantiate";
}

export type Action<T extends ActionType = ActionType> = (
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
  | ForgetContract
  | Instantiate
  | Disconnect
  | Disconnected
  | StartInstantiate
) & { type: T };

type DispatchType = (args: Action) => Action;

export function useDispatch(): DispatchType {
  const dispatch = _useDispatch();
  return (action: Action) => dispatch(action);
}

export function isType<P extends ActionType>(type: P) {
  return (action: Action): action is Action<P> => action.type === type;
}
