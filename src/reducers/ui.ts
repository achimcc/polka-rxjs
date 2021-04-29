import { Action } from "./actions";

export interface UiState {
  isApiConnected: boolean;
  isWasmUploaded: boolean;
  isAbiUploaded: boolean;
  deployMessages: Array<any>;
}

const initialState: UiState = {
  isApiConnected: false,
  isWasmUploaded: false,
  isAbiUploaded: false,
  deployMessages: [],
};

const contractReducer = (
  state: UiState = initialState,
  action: Action
): UiState => {
  switch (action.type) {
    case "Connected": {
      console.log("Connected!");
      return { ...state, isApiConnected: true };
    }
    case "UploadWasmSuccess": {
      return { ...state, isWasmUploaded: true };
    }
    case "UploadAbiSuccess": {
      console.log("success abi!");
      return { ...state, isAbiUploaded: true };
    }
    case "DeployMessage": {
      const deployMessages = [...state.deployMessages, action.payload];
      return { ...state, deployMessages };
    }
    default:
      return state;
  }
};

export default contractReducer;
