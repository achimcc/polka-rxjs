import { Abi } from "@polkadot/api-contract";
import { AnyJson } from "@polkadot/types/types";

export type ContractStatus =
  | "Endpoint"
  | "Upload"
  | "Settings"
  | "Deployed"
  | "Deploying"
  | "Error";

export interface UIMessage {
  text: string;
  isError: boolean;
}

export interface UIContract {
  name: string;
  id: string;
  address?: string | undefined;
  methods?: Array<string>;
  wasm: Uint8Array;
  json: AnyJson;
}

export interface ContractInstance {
  contractId: string;
  address: string | undefined;
}

export type ConnectStatus = "Unconnected" | "Connected" | "Error";
