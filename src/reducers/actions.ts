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
  | "DeployMessage"
  | "Gas"
  | "Endowment"
  | "UploadWasmSuccess"
  | "Address"
  | "CancelDeploy"
  | "Call"
  | "CallRpc"
  | "CallResult";

export interface BaseAction extends DefaultAction<ActionType> {
  type: ActionType;
  payload?: object | number | string;
}

export interface Gas extends BaseAction {
  type: "Gas";
  payload: string;
}

export interface Endowment extends BaseAction {
  type: "Endowment";
  payload: string;
}

export interface Address extends BaseAction {
  type: "Address";
  payload: string;
}

export interface UploadContract extends BaseAction {
  type: "UploadContract";
  payload: File;
}

export interface UploadContractSuccess extends BaseAction {
  type: "UploadContractSuccess";
  payload: {
    abi: Abi;
    wasm: Uint8Array;
    name: string;
    methods: Array<string>;
    hash: string;
  };
}

export interface Deploy extends BaseAction {
  type: "Deploy";
}

export interface DeployMessage extends BaseAction {
  type: "DeployMessage";
  payload: {
    result: ISubmittableResult;
    status: ContractStatus;
  };
}
export interface Connect extends BaseAction {
  type: "Connect";
}

export interface Connected extends BaseAction {
  type: "Connected";
  payload: ApiRx;
}

export interface UploadWasmSuccess extends BaseAction {
  type: "UploadWasmSuccess";
  payload: Uint8Array;
}

export interface CancelDeploy extends BaseAction {
  type: "CancelDeploy";
}

export interface CallResult extends BaseAction {
  type: "CallResult";
  payload: UIMessage;
}

export interface Call extends BaseAction {
  type: "Call";
  payload: { address: string; method: string };
}

export interface CallRpc extends BaseAction {
  type: "CallRpc";
  payload: { address: string; method: string };
}

export type Action =
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
  | CallResult;

type DispatchType = (args: Action) => Action;

export function useDispatch(): DispatchType {
  const dispatch = _useDispatch();
  return (action: Action) => dispatch(action);
}
