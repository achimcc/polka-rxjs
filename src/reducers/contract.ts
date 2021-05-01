import { ApiRx } from "@polkadot/api";
import { Action } from "./actions";

export interface ContractState {
  api: ApiRx | undefined;
  wasm: Uint8Array | undefined;
  abi: JSON | undefined;
  Gas: number | undefined;
  Endowment: number | undefined;
}

const initialState: ContractState = {
  api: undefined,
  wasm: undefined,
  abi: undefined,
  Gas: undefined,
  Endowment: undefined,
};

const contractReducer = (
  state: ContractState = initialState,
  action: Action
): ContractState => {
  switch (action.type) {
    case "Connected": {
      console.log("Subscribed!", action.payload, state);
      return { ...state, api: action.payload as ApiRx };
    }
    case "UploadWasmSuccess": {
      console.log("success wasm!");
      return { ...state, wasm: action.payload as Uint8Array };
    }
    case "UploadAbiSuccess": {
      console.log("success abi!");
      return { ...state, abi: action.payload as JSON };
    }
    case "SetGas": {
      console.log("success abi!");
      return { ...state, Gas: action.payload as number };
    }
    case "SetEndowment": {
      console.log("success abi!");
      return { ...state, Endowment: action.payload as number };
    }
    default:
      return state;
  }
};

export default contractReducer;
