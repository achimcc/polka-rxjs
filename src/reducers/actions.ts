import { ApiRx, ApiPromise } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { ISubmittableResult } from "@polkadot/types/types";
import { Action as DefaultAction } from "redux";

import { useDispatch as _useDispatch } from "react-redux";

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
  | "CancelDeploy";

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
  payload: { abi: Abi; wasm: Uint8Array; name: string };
}

export interface Deploy extends BaseAction {
  type: "Deploy";
}

export interface DeployMessage extends BaseAction {
  type: "DeployMessage";
  payload: ISubmittableResult;
}
export interface Connect extends BaseAction {
  type: "Connect";
}

export interface Connected extends BaseAction {
  type: "Connected";
  payload: ApiRx | ApiPromise;
}

export interface UploadWasmSuccess extends BaseAction {
  type: "UploadWasmSuccess";
  payload: Uint8Array;
}

export interface CancelDeploy extends BaseAction {
  type: "CancelDeploy";
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
  | CancelDeploy;

type DispatchType = (args: Action) => Action;

export function useDispatch(): DispatchType {
  const dispatch = _useDispatch();
  return (action: Action) => dispatch(action);
}
