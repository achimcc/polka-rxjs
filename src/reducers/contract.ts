import { ApiRx } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { Action } from "./actions";

export interface ContractState {
  api: ApiRx | undefined;
  wasm: Uint8Array | undefined;
  abi: Abi | undefined;
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
      return { ...state, abi: action.payload };
    }
    case "Gas": {
      console.log("SetGas!");
      return { ...state, Gas: action.payload };
    }
    case "Endowment": {
      console.log("SetEndowment!");
      return { ...state, Endowment: action.payload };
    }
    default:
      return state;
  }
};

export default contractReducer;
