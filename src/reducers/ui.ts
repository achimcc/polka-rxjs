import { Action } from "./actions";

export interface UiState {
  isApiConnected: boolean;
  isAbiUploaded: boolean;
  isContractInstantiated: boolean;
  deployMessages: Array<any>;
  deployStatus: undefined | "deploying" | "deployed" | "error";
  contractStatus: "Endpoint" | "Upload" | "Settings" | "Deploy";
  Gas: string | undefined;
  Endowment: string | undefined;
  Address: string | undefined;
}

const initialState: UiState = {
  isApiConnected: false,
  isAbiUploaded: false,
  isContractInstantiated: false,
  deployStatus: undefined,
  contractStatus: "Endpoint",
  deployMessages: [],
  Gas: "155852802980",
  Endowment: "1300889614901161",
  Address: "ws://127.0.0.1:9944",
};

const contractReducer = (
  state: UiState = initialState,
  action: Action
): UiState => {
  switch (action.type) {
    case "Connected": {
      return { ...state, isApiConnected: true, contractStatus: "Upload" };
    }
    case "UploadContractSuccess": {
      return { ...state, isAbiUploaded: true, contractStatus: "Settings" };
    }
    case "UploadContractSuccess": {
      return { ...state, contractStatus: "Deploy" };
    }
    case "Deploy": {
      return { ...state, deployStatus: "deploying" };
    }
    case "DeployMessage": {
      const deployMessages = [...state.deployMessages, action.payload];
      return { ...state, deployMessages };
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
