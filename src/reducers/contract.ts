import { ApiRx, ApiPromise } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { Action } from "./actions";

export interface ContractState {
  api: ApiRx | ApiPromise | undefined;
  abi: Abi | undefined;
  wasm: undefined | Uint8Array;
}

const initialState: ContractState = {
  api: undefined,
  wasm: undefined,
  abi: undefined,
};

const contractReducer = (
  state: ContractState = initialState,
  action: Action
): ContractState => {
  console.log("action: ", action);
  switch (action.type) {
    case "Connected": {
      console.log("Subscribed!", action.payload, state);
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
