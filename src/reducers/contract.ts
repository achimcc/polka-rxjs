import { ApiRx } from "@polkadot/api";
import { Abi } from "@polkadot/api-contract";
import { produce } from "immer";
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
): ContractState =>
  produce(state, (draft: ContractState) => {
    switch (action.type) {
      case "Connected": {
        draft.api = action.payload;
        break;
      }
      case "UploadWasmSuccess": {
        draft.wasm = action.payload;
        break;
      }
      case "UploadContractSuccess": {
        const { abi, wasm } = action.payload;
        draft.abi = abi;
        draft.wasm = wasm;
        break;
      }
    }
  });

export default contractReducer;
