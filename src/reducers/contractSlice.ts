import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiRx } from "@polkadot/api";
import { UploadChangeParam } from "antd/lib/upload";

export interface ContractState {
  apiState: undefined | "connecting" | "connected";
  abiState: undefined | "uploading" | "uploaded";
  contractState: undefined | "deploying" | "deployed";
  isAbiUploaded: boolean;
  deployMessages: Array<unknown>;
  api: ApiRx | undefined;
  wasm: Uint8Array | undefined;
  abi: JSON | undefined;
  Gas: number | undefined;
  Endowment: number | undefined;
}

const initialState: ContractState = {
  apiState: undefined,
  abiState: undefined,
  contractState: undefined,
  isAbiUploaded: false,
  deployMessages: [],
  api: undefined,
  wasm: undefined,
  abi: undefined,
  Gas: undefined,
  Endowment: undefined,
};

export const counterSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    connect: (state) => {
      state.apiState = "connecting";
    },
    connected: (state, action: PayloadAction<ApiRx>) => {
      state.apiState = "connected";
      state.api = action.payload;
    },
    deploy: (state) => {
      state.contractState = "deploying";
    },
    uploadContract: (state, action: PayloadAction<UploadChangeParam>) => {
      state.abiState = "uploading";
    },
    uploadContractSuccess: (state, action: PayloadAction<JSON>) => {
      state.isAbiUploaded = true;
      state.abiState = "uploaded";
      state.abi = action.payload;
    },
    deployMessage: (state, action: PayloadAction<unknown>) => {
      state.deployMessages.push(action.payload);
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setGas: (state, action: PayloadAction<number>) => {
      state.Gas = action.payload;
    },
    setEndowment: (state, action: PayloadAction<number>) => {
      state.Endowment = action.payload;
    },
  },
});

export const {
  connected,
  uploadContractSuccess,
  setGas,
  setEndowment,
} = counterSlice.actions;

export const actions = counterSlice.actions;
