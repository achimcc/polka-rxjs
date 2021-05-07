import { ApiRx } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { ISubmittableResult } from "@polkadot/types/types";
import { Action as DefaultAction } from "redux";
import { useDispatch as _useDispatch } from "react-redux";
import { ContractStatus, UIMessage } from "../types";

type ActionType =
  | "Connect"
  | "Connected"
  | "Deploy"
  | "UploadContract"
  | "UploadContractSuccess"
  | "ForgetContract"
  | "DeployMessage"
  | "Gas"
  | "Endowment"
  | "UploadWasmSuccess"
  | "Address"
  | "CancelDeploy"
  | "Call"
  | "CallRpc"
  | "CallResult";

interface BaseAction extends DefaultAction<ActionType> {
  type: ActionType;
  payload?: object | number | string;
}

interface Gas extends BaseAction {
  type: "Gas";
  payload: string;
}

interface Endowment extends BaseAction {
  type: "Endowment";
  payload: string;
}

interface Address extends BaseAction {
  type: "Address";
  payload: string;
}

interface UploadContract extends BaseAction {
  type: "UploadContract";
  payload: File;
}

interface UploadContractSuccess extends BaseAction {
  type: "UploadContractSuccess";
  payload: {
    abi: Abi;
    wasm: Uint8Array;
    name: string;
    methods: Array<string>;
    hash: string;
  };
}

interface Deploy extends BaseAction {
  type: "Deploy";
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
}

interface Connected extends BaseAction {
  type: "Connected";
  payload: ApiRx;
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
  payload: { address: string };
}

export type Action<T extends ActionType = ActionType> = (
  | Gas
  | Endowment
  | UploadContract
  | UploadContractSuccess
  | Deploy
  | DeployMessage
  | Connect
  | Connected
  | UploadWasmSuccess
  | Address
  | CancelDeploy
  | Call
  | CallRpc
  | CallResult
  | ForgetContract
) & { type: T };

type DispatchType = (args: Action) => Action;

export function useDispatch(): DispatchType {
  const dispatch = _useDispatch();
  return (action: Action) => dispatch(action);
}

export function isType<P extends ActionType>(type: P) {
  return (action: Action): action is Action<P> => action.type === type;
}
