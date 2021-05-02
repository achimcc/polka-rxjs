import { ApiRx } from "@polkadot/api";
import { ISubmittableResult } from "@polkadot/types/types";
import { UploadChangeParam } from "antd/lib/upload";
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
  | "UploadWasmSuccess";

export interface BaseAction extends DefaultAction<ActionType> {
  type: ActionType;
  payload?: object | number | string;
}

export interface Gas extends BaseAction {
  type: "Gas";
  payload: number;
}

export interface Endowment extends BaseAction {
  type: "Endowment";
  payload: number;
}

export interface UploadContract extends BaseAction {
  type: "UploadContract";
  payload: UploadChangeParam;
}

export interface UploadContractSuccess extends BaseAction {
  type: "UploadContractSuccess";
  payload: JSON;
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
  payload: ApiRx;
}

export interface UploadWasmSuccess extends BaseAction {
  type: "UploadWasmSuccess";
  payload: Uint8Array;
}

export type ContractAction =
  | Gas
  | Endowment
  | UploadContract
  | UploadContractSuccess
  | Deploy
  | DeployMessage
  | Connect
  | Connected
  | UploadWasmSuccess;

type DispatchType = (args: ContractAction) => ContractAction;

export function useDispatch(): DispatchType {
  const dispatch = _useDispatch();
  return (action: ContractAction) => dispatch(action);
}
