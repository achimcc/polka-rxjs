import { ApiRx } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { Action } from "./actions";

export interface ContractState {
  abi: Abi | undefined;
  wasm: undefined | Uint8Array;
  api: ApiRx | undefined;
}

const initialState: ContractState = {
  wasm: undefined,
  abi: undefined,
  api: undefined,
};

const contractReducer = (
  state: ContractState = initialState,
  action: Action
): ContractState => {
  console.log("action: ", action);
  switch (action.type) {
    case "Connected": {
      return { ...state, api: action.payload };
    }
    case "UploadWasmSuccess": {
      console.log("success wasm!");
      return { ...state, wasm: action.payload };
    }
    case "UploadContractSuccess": {
      console.log("success abi!");
      const { abi, wasm } = action.payload;
      return { ...state, abi, wasm };
    }
    default:
      return state;
  }
};

export default contractReducer;
